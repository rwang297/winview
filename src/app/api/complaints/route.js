import sql from '@/app/api/utils/sql';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, description } = body;

    // Validate required fields
    if (!name || !email || !phone || !category || !description) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Insert complaint into database
    const result = await sql`
      INSERT INTO complaints (name, email, phone, category, description)
      VALUES (${name}, ${email}, ${phone}, ${category}, ${description})
      RETURNING id, created_at
    `;

    // TODO: Send confirmation email (stubbed for now)
    console.log(`Complaint confirmation email would be sent to: ${email}`);

    return Response.json({
      success: true,
      message: 'Complaint submitted successfully',
      complaintId: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    return Response.json({ error: 'Failed to submit complaint' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const complaints = await sql`
      SELECT 
        id, 
        name, 
        email, 
        phone, 
        category, 
        description, 
        created_at
      FROM complaints
      ORDER BY created_at DESC
    `;

    return Response.json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return Response.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
}
