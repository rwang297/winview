import {
  addAdminEmail,
  ensureAllowlistTable,
  getAllowlist,
  isAdminSession,
  removeAdminEmail,
} from '@/app/api/utils/admin';
import sql from '@/app/api/utils/sql';
import { auth } from '@/auth';

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await ensureAllowlistTable();
    const { searchParams } = new URL(request.url);
    const meOnly = searchParams.get('me');

    const iamAdmin = await isAdminSession(session);

    if (meOnly) {
      return Response.json({ isAdmin: iamAdmin });
    }

    if (!iamAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const admins = await getAllowlist();
    return Response.json({ admins });
  } catch (error) {
    console.error('Error fetching allowlist:', error);
    return Response.json({ error: 'Failed to fetch allowlist' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await ensureAllowlistTable();

    const body = await request.json();
    const email = String(body?.email || '')
      .trim()
      .toLowerCase();
    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Allow if current user is admin OR there are no admins yet (bootstrap)
    const iamAdmin = await isAdminSession(session);
    if (!iamAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const admins = await addAdminEmail(email, session.user.id);
    return Response.json({ success: true, admins });
  } catch (error) {
    console.error('Error adding admin:', error);
    return Response.json({ error: error?.message || 'Failed to add admin' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const iamAdmin = await isAdminSession(session);
    if (!iamAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    let email = emailParam;
    if (!email) {
      try {
        const body = await request.json();
        email = body?.email;
      } catch (_) {}
    }
    email = String(email || '')
      .trim()
      .toLowerCase();
    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Prevent self-removal if it would leave zero admins
    try {
      const admins = await removeAdminEmail(email);
      return Response.json({ success: true, admins });
    } catch (e) {
      return Response.json({ error: e?.message || 'Failed to remove admin' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error removing admin:', error);
    return Response.json({ error: 'Failed to remove admin' }, { status: 500 });
  }
}
