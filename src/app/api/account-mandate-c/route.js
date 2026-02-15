import sql from '@/app/api/utils/sql';

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS account_mandate_c (
      id SERIAL PRIMARY KEY,
      account_id INTEGER,
      date_account_opened DATE,
      signature_url TEXT,
      passport_photo_url TEXT,
      -- docs
      doc_two_passports BOOLEAN,
      doc_valid_id BOOLEAN,
      doc_id_type TEXT,
      doc_id_number TEXT,
      doc_issue_state TEXT,
      doc_expiry_date DATE,
      doc_utility_bill BOOLEAN,
      doc_two_references BOOLEAN,
      -- terms
      terms_accepted BOOLEAN,
      customer_signature_name TEXT,
      customer_signature_date DATE,
      note_acknowledged BOOLEAN,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    await ensureTable();

    const map = {
      accountId: 'account_id',
      dateAccountOpened: 'date_account_opened',
      signatureUrl: 'signature_url',
      passportPhotoUrl: 'passport_photo_url',
      docTwoPassports: 'doc_two_passports',
      docValidId: 'doc_valid_id',
      docIdType: 'doc_id_type',
      docIdNumber: 'doc_id_number',
      docIssueState: 'doc_issue_state',
      docExpiryDate: 'doc_expiry_date',
      docUtilityBill: 'doc_utility_bill',
      docTwoReferences: 'doc_two_references',
      termsAccepted: 'terms_accepted',
      customerSignatureName: 'customer_signature_name',
      customerSignatureDate: 'customer_signature_date',
      noteAcknowledged: 'note_acknowledged',
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

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO account_mandate_c (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at`;
    const result = await sql(query, values);

    return Response.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error saving Section C:', error);
    return Response.json({ error: 'Failed to save Section C' }, { status: 500 });
  }
}
