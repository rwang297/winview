import { isAdminSession } from '@/app/api/utils/admin'; // ADD: admin check
import sql from '@/app/api/utils/sql';
import { auth } from '@/auth'; // ADD: require auth for GET (admin listing)

// Ensure table exists (idempotent)
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS ippis_applications (
      id SERIAL PRIMARY KEY,
      account_id INTEGER,
      surname TEXT,
      first_name TEXT,
      middle_name TEXT,
      apf_no TEXT,
      rank TEXT,
      command_formation TEXT,
      date_of_enlistment DATE,
      date_of_retirement DATE,
      residential_address TEXT,
      permanent_address TEXT,
      lga TEXT,
      state TEXT,
      telephone_a TEXT,
      telephone_b TEXT,
      personal_email TEXT,
      mss_cfo TEXT,
      ippis_number TEXT,
      pay_point TEXT,
      account_number TEXT,
      automobile_type TEXT,
      pfa_name TEXT,
      pension_pin TEXT,
      cooperative_number TEXT,
      member_number TEXT,
      compulsory_savings NUMERIC,
      voluntary_savings NUMERIC,
      total_savings NUMERIC,
      has_police_id BOOLEAN,
      current_payslip_months TEXT,
      nok_surname TEXT,
      nok_first_name TEXT,
      nok_middle_name TEXT,
      nok_relationship TEXT,
      nok_address TEXT,
      nok_telephone TEXT,
      nok_email TEXT,
      monthly_repayment NUMERIC,
      applicant_full_name TEXT,
      applicant_rank TEXT,
      applicant_date DATE,
      years_left_in_service TEXT,
      signature TEXT,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();

    await ensureTable();

    // Map allowed fields from body to columns
    const map = {
      accountId: 'account_id',
      surname: 'surname',
      firstName: 'first_name',
      middleName: 'middle_name',
      apfNo: 'apf_no',
      rank: 'rank',
      commandFormation: 'command_formation',
      dateOfEnlistment: 'date_of_enlistment',
      dateOfRetirement: 'date_of_retirement',
      residentialAddress: 'residential_address',
      permanentAddress: 'permanent_address',
      lga: 'lga',
      state: 'state',
      telephoneA: 'telephone_a',
      telephoneB: 'telephone_b',
      personalEmail: 'personal_email',
      mssCfo: 'mss_cfo',
      ippisNumber: 'ippis_number',
      payPoint: 'pay_point',
      accountNumber: 'account_number',
      automobileType: 'automobile_type',
      pfaName: 'pfa_name',
      pensionPIN: 'pension_pin',
      cooperativeNumber: 'cooperative_number',
      memberNumber: 'member_number',
      compulsorySavings: 'compulsory_savings',
      voluntarySavings: 'voluntary_savings',
      totalSavings: 'total_savings',
      hasPoliceId: 'has_police_id',
      currentPayslipMonths: 'current_payslip_months',
      nokSurname: 'nok_surname',
      nokFirstName: 'nok_first_name',
      nokMiddleName: 'nok_middle_name',
      nokRelationship: 'nok_relationship',
      nokAddress: 'nok_address',
      nokTelephone: 'nok_telephone',
      nokEmail: 'nok_email',
      monthlyRepayment: 'monthly_repayment',
      applicantFullName: 'applicant_full_name',
      applicantRank: 'applicant_rank',
      applicantDate: 'applicant_date',
      yearsLeftInService: 'years_left_in_service',
      signature: 'signature',
    };

    const columns = [];
    const values = [];

    Object.entries(map).forEach(([key, col]) => {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        columns.push(col);
        values.push(body[key] === '' ? null : body[key]);
      }
    });

    if (columns.length === 0) {
      return Response.json({ error: 'No data provided' }, { status: 400 });
    }

    // Build parameterized INSERT
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO ippis_applications (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at`;

    const result = await sql(query, values);

    return Response.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error creating IPPIS application:', error);
    return Response.json({ error: 'Failed to create IPPIS application' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Require a signed-in user for listing (admin UI)
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only admins can view applications
    const isAdmin = await isAdminSession(session);
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    await ensureTable();

    // NEW: Query params for filtering/sorting/limit
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('search') || '').trim().toLowerCase();
    const rank = (searchParams.get('rank') || '').trim();
    const payPoint = (searchParams.get('payPoint') || '').trim();
    const state = (searchParams.get('state') || '').trim();
    const hasPoliceId = searchParams.get('hasPoliceId'); // "true" | "false" | null
    const limit = Math.min(
      Math.max(Number.parseInt(searchParams.get('limit') || '100', 10) || 100, 1),
      500
    );

    const sortByRaw = (searchParams.get('sortBy') || 'created_at').trim();
    const sortDirRaw = (searchParams.get('sortDir') || 'desc').trim();

    // Whitelist sortable columns to prevent SQL injection
    const sortable = new Set([
      'created_at',
      'rank',
      'pay_point',
      'state',
      'monthly_repayment',
      'total_savings',
      'automobile_type',
    ]);
    const sortBy = sortable.has(sortByRaw) ? sortByRaw : 'created_at';
    const sortDir = sortDirRaw.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    // Build dynamic WHERE
    const whereParts = [];
    const values = [];

    if (q) {
      // Search across selected text columns
      whereParts.push(
        `(
          LOWER(COALESCE(surname, '')) || ' ' ||
          LOWER(COALESCE(first_name, '')) || ' ' ||
          LOWER(COALESCE(middle_name, '')) || ' ' ||
          LOWER(COALESCE(personal_email, '')) || ' ' ||
          LOWER(COALESCE(ippis_number, '')) || ' ' ||
          LOWER(COALESCE(pay_point, '')) || ' ' ||
          LOWER(COALESCE(rank, '')) || ' ' ||
          LOWER(COALESCE(telephone_a, '')) || ' ' ||
          LOWER(COALESCE(telephone_b, ''))
        ) LIKE $${values.length + 1}`
      );
      values.push(`%${q}%`);
    }
    if (rank) {
      whereParts.push(`rank = $${values.length + 1}`);
      values.push(rank);
    }
    if (payPoint) {
      whereParts.push(`pay_point = $${values.length + 1}`);
      values.push(payPoint);
    }
    if (state) {
      whereParts.push(`state = $${values.length + 1}`);
      values.push(state);
    }
    if (hasPoliceId === 'true' || hasPoliceId === 'false') {
      whereParts.push(`has_police_id = $${values.length + 1}`);
      values.push(hasPoliceId === 'true');
    }

    const whereSql = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    // Build final SQL string in function form
    const query = `
      SELECT *
      FROM ippis_applications
      ${whereSql}
      ORDER BY ${sortBy} ${sortDir}
      LIMIT $${values.length + 1}
    `;
    const rows = await sql(query, [...values, limit]);

    return Response.json({ applications: rows });
  } catch (error) {
    console.error('Error fetching IPPIS applications:', error);
    return Response.json({ error: 'Failed to fetch IPPIS applications' }, { status: 500 });
  }
}
