import sql from '@/app/api/utils/sql';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, age, gender, occupation, address, idCardType, accountNumber } =
      body; // add optional fields

    // Validate required fields (keep existing required fields only)
    if (!fullName || !email || !phone || !age || !gender || !occupation || !address) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Insert account into database including optional id_card_type and account_number
    const result = await sql`
      INSERT INTO accounts (full_name, email, phone, age, gender, occupation, address, id_card_type, account_number)
      VALUES (${fullName}, ${email}, ${phone}, ${age}, ${gender}, ${occupation}, ${address}, ${idCardType || null}, ${accountNumber || null})
      RETURNING id, created_at
    `;

    // TODO: Send confirmation email (stubbed for now)
    console.log(`Confirmation email would be sent to: ${email}`);

    return Response.json({
      success: true,
      message: 'Account created successfully',
      accountId: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return Response.json({ error: 'Failed to create account' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Add pagination support: /api/accounts?limit=10&page=1
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const limitParam = Number.parseInt(searchParams.get('limit') || '10', 10);
    const pageParam = Number.parseInt(searchParams.get('page') || '1', 10);
    const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(100, limitParam)) : 10;
    const page = Number.isFinite(pageParam) ? Math.max(1, pageParam) : 1;
    const offset = (page - 1) * limit;

    const [accounts, countRows] = await sql.transaction((txn) => [
      txn`
        SELECT 
          id, 
          full_name, 
          email, 
          phone, 
          age, 
          gender, 
          occupation, 
          address, 
          id_card_type,
          account_number,
          created_at
        FROM accounts
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `,
      txn`SELECT COUNT(*)::int AS count FROM accounts`,
    ]);

    const total = countRows?.[0]?.count || 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return Response.json({ accounts, page, limit, total, totalPages });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return Response.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}
