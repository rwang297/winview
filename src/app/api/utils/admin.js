import sql from '@/app/api/utils/sql';
import { auth } from '@/auth';

export async function ensureAllowlistTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_allowlist (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER
    )
  `;
}

// ADD: audit log table for admin actions
export async function ensureAuditLogTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id SERIAL PRIMARY KEY,
      action TEXT NOT NULL, -- 'add' | 'remove'
      target_email TEXT NOT NULL,
      performed_by INTEGER,
      performed_by_email TEXT,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

// ADD: helper to log actions
export async function logAdminAction(action, targetEmail, performer) {
  await ensureAuditLogTable();
  const pId = performer?.user?.id || null;
  const pEmail = performer?.user?.email || null;
  await sql`
    INSERT INTO admin_audit_log (action, target_email, performed_by, performed_by_email)
    VALUES (${String(action)}, ${String(targetEmail)}, ${pId}, ${pEmail})
  `;
}

export async function getAllowlist() {
  await ensureAllowlistTable();
  return sql`
    SELECT email, created_at FROM admin_allowlist ORDER BY created_at DESC
  `;
}

export async function isAdminSession(session) {
  if (!session || !session.user?.email) return false;
  const email = String(session.user.email).toLowerCase();
  await ensureAllowlistTable();
  // Check if allowlist has any entries
  const total = await sql`SELECT COUNT(*) AS c FROM admin_allowlist`;
  const count = Number.parseInt(total?.[0]?.c || 0, 10);
  if (count === 0) {
    // Bootstrap mode: first admin hasn't been set. Allow current signed-in user.
    return true;
  }
  const rows = await sql`SELECT 1 FROM admin_allowlist WHERE LOWER(email) = ${email} LIMIT 1`;
  return rows.length > 0;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { ok: false, status: 401, session: null };
  }
  const ok = await isAdminSession(session);
  if (!ok) return { ok: false, status: 403, session };
  return { ok: true, status: 200, session };
}

export async function addAdminEmail(email, createdBy) {
  if (!email) throw new Error('Email is required');
  const normalized = String(email).trim().toLowerCase();
  await ensureAllowlistTable();
  await sql`
    INSERT INTO admin_allowlist (email, created_by)
    VALUES (${normalized}, ${createdBy || null})
    ON CONFLICT (email) DO NOTHING
  `;
  // Log action
  try {
    const session = await auth();
    await logAdminAction('add', normalized, session);
  } catch (_) {}
  const list = await getAllowlist();
  return list;
}

export async function removeAdminEmail(email) {
  if (!email) throw new Error('Email is required');
  const normalized = String(email).trim().toLowerCase();
  await ensureAllowlistTable();
  // Prevent removing the last admin to avoid lockout
  const total = await sql`SELECT COUNT(*) AS c FROM admin_allowlist`;
  const count = Number.parseInt(total?.[0]?.c || 0, 10);
  if (count <= 1) {
    throw new Error('Cannot remove the last admin');
  }
  await sql`DELETE FROM admin_allowlist WHERE LOWER(email) = ${normalized}`;
  // Log action
  try {
    const session = await auth();
    await logAdminAction('remove', normalized, session);
  } catch (_) {}
  const list = await getAllowlist();
  return list;
}
