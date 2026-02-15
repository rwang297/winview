import sql from '@/app/api/utils/sql';

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS reference_forms_d (
      id SERIAL PRIMARY KEY,
      account_id INTEGER,
      min_deposit_acknowledged BOOLEAN,
      -- Referee 1
      r1_name TEXT,
      r1_date DATE,
      r1_address TEXT,
      r1_applicant_name TEXT,
      r1_business_office TEXT,
      r1_applicant_signs TEXT,
      r1_bank_name TEXT,
      r1_branch TEXT,
      r1_account_no TEXT,
      r1_signature_of_referee TEXT,
      r1_official_referee_bank TEXT,
      r1_official_client_signature_verified_by TEXT,
      r1_official_to_business_office TEXT,
      r1_official_verification_result TEXT,
      r1_official_signed_by1 TEXT,
      r1_official_signed_by2 TEXT,
      -- Referee 2
      r2_name TEXT,
      r2_date DATE,
      r2_address TEXT,
      r2_applicant_name TEXT,
      r2_business_office TEXT,
      r2_applicant_signs TEXT,
      r2_bank_name TEXT,
      r2_branch TEXT,
      r2_account_no TEXT,
      r2_signature_of_referee TEXT,
      r2_official_referee_bank TEXT,
      r2_official_client_signature_verified_by TEXT,
      r2_official_to_business_office TEXT,
      r2_official_verification_result TEXT,
      r2_official_signed_by1 TEXT,
      r2_official_signed_by2 TEXT,
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
      minDepositAcknowledged: 'min_deposit_acknowledged',
      r1_name: 'r1_name',
      r1_date: 'r1_date',
      r1_address: 'r1_address',
      r1_applicantName: 'r1_applicant_name',
      r1_businessOffice: 'r1_business_office',
      r1_applicantSigns: 'r1_applicant_signs',
      r1_bankName: 'r1_bank_name',
      r1_branch: 'r1_branch',
      r1_accountNo: 'r1_account_no',
      r1_signatureOfReferee: 'r1_signature_of_referee',
      r1_official_refereeBank: 'r1_official_referee_bank',
      r1_official_clientSignatureVerifiedBy: 'r1_official_client_signature_verified_by',
      r1_official_toBusinessOffice: 'r1_official_to_business_office',
      r1_official_verificationResult: 'r1_official_verification_result',
      r1_official_signedBy1: 'r1_official_signed_by1',
      r1_official_signedBy2: 'r1_official_signed_by2',
      r2_name: 'r2_name',
      r2_date: 'r2_date',
      r2_address: 'r2_address',
      r2_applicantName: 'r2_applicant_name',
      r2_businessOffice: 'r2_business_office',
      r2_applicantSigns: 'r2_applicant_signs',
      r2_bankName: 'r2_bank_name',
      r2_branch: 'r2_branch',
      r2_accountNo: 'r2_account_no',
      r2_signatureOfReferee: 'r2_signature_of_referee',
      r2_official_refereeBank: 'r2_official_referee_bank',
      r2_official_clientSignatureVerifiedBy: 'r2_official_client_signature_verified_by',
      r2_official_toBusinessOffice: 'r2_official_to_business_office',
      r2_official_verificationResult: 'r2_official_verification_result',
      r2_official_signedBy1: 'r2_official_signed_by1',
      r2_official_signedBy2: 'r2_official_signed_by2',
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
    const query = `INSERT INTO reference_forms_d (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at`;
    const result = await sql(query, values);

    return Response.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error saving Section D:', error);
    return Response.json({ error: 'Failed to save Section D' }, { status: 500 });
  }
}
