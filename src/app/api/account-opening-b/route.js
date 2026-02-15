import sql from '@/app/api/utils/sql';

// Ensure table exists (idempotent)
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS account_opening_b (
      id SERIAL PRIMARY KEY,
      account_id INTEGER,
      -- category / ownership
      type_individual BOOLEAN,
      type_joint BOOLEAN,
      name_of_account TEXT,
      prod_standard_saving BOOLEAN,
      prod_assusu BOOLEAN,
      prod_target BOOLEAN,
      prod_kiddies BOOLEAN,
      prod_micro_credit BOOLEAN,
      prod_save_smile BOOLEAN,
      prod_current BOOLEAN,
      branch TEXT,
      bvn TEXT,
      account_number_office TEXT,
      -- personal info
      title TEXT,
      surname TEXT,
      first_name TEXT,
      other_names TEXT,
      mother_maiden_name TEXT,
      nick_name TEXT,
      dob DATE,
      gender TEXT,
      place_of_birth TEXT,
      nationality TEXT,
      state_of_origin TEXT,
      home_town TEXT,
      marital_status TEXT,
      phone1 TEXT,
      phone2 TEXT,
      residential_address TEXT,
      state TEXT,
      local_govt TEXT,
      district TEXT,
      town TEXT,
      landmark TEXT,
      -- ID
      id_national BOOLEAN,
      id_drivers BOOLEAN,
      id_passport BOOLEAN,
      id_voters BOOLEAN,
      id_other BOOLEAN,
      id_number TEXT,
      id_issue_state TEXT,
      id_expires DATE,
      test_question TEXT,
      test_answer TEXT,
      purpose_of_account TEXT,
      -- next of kin
      nok_name TEXT,
      nok_relationship TEXT,
      nok_telephone TEXT,
      nok_dob DATE,
      nok_gender TEXT,
      nok_address TEXT,
      nok_email TEXT,
      nok_nationality TEXT,
      nok_state_of_origin TEXT,
      nok_local_govt TEXT,
      nok_home_town TEXT,
      -- services
      svc_atm_card BOOLEAN,
      svc_sms_alert BOOLEAN,
      svc_email_alert BOOLEAN,
      svc_others BOOLEAN,
      svc_mobile_banking BOOLEAN,
      svc_mail_statement BOOLEAN,
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
      typeIndividual: 'type_individual',
      typeJoint: 'type_joint',
      nameOfAccount: 'name_of_account',
      prodStandardSaving: 'prod_standard_saving',
      prodAssusu: 'prod_assusu',
      prodTarget: 'prod_target',
      prodKiddies: 'prod_kiddies',
      prodMicroCredit: 'prod_micro_credit',
      prodSaveSmile: 'prod_save_smile',
      prodCurrent: 'prod_current',
      branch: 'branch',
      bvn: 'bvn',
      accountNumberOffice: 'account_number_office',
      title: 'title',
      surname: 'surname',
      firstName: 'first_name',
      otherNames: 'other_names',
      motherMaidenName: 'mother_maiden_name',
      nickName: 'nick_name',
      dob: 'dob',
      gender: 'gender',
      placeOfBirth: 'place_of_birth',
      nationality: 'nationality',
      stateOfOrigin: 'state_of_origin',
      homeTown: 'home_town',
      maritalStatus: 'marital_status',
      phone1: 'phone1',
      phone2: 'phone2',
      residentialAddress: 'residential_address',
      state: 'state',
      localGovt: 'local_govt',
      district: 'district',
      town: 'town',
      landmark: 'landmark',
      idNational: 'id_national',
      idDrivers: 'id_drivers',
      idPassport: 'id_passport',
      idVoters: 'id_voters',
      idOther: 'id_other',
      idNumber: 'id_number',
      idIssueState: 'id_issue_state',
      idExpires: 'id_expires',
      testQuestion: 'test_question',
      testAnswer: 'test_answer',
      purposeOfAccount: 'purpose_of_account',
      nokName: 'nok_name',
      nokRelationship: 'nok_relationship',
      nokTelephone: 'nok_telephone',
      nokDob: 'nok_dob',
      nokGender: 'nok_gender',
      nokAddress: 'nok_address',
      nokEmail: 'nok_email',
      nokNationality: 'nok_nationality',
      nokStateOfOrigin: 'nok_state_of_origin',
      nokLocalGovt: 'nok_local_govt',
      nokHomeTown: 'nok_home_town',
      svcAtmCard: 'svc_atm_card',
      svcSmsAlert: 'svc_sms_alert',
      svcEmailAlert: 'svc_email_alert',
      svcOthers: 'svc_others',
      svcMobileBanking: 'svc_mobile_banking',
      svcMailStatement: 'svc_mail_statement',
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
    const query = `INSERT INTO account_opening_b (${columns.join(', ')}) VALUES (${placeholders}) RETURNING id, created_at`;
    const result = await sql(query, values);

    return Response.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Error saving Section B:', error);
    return Response.json({ error: 'Failed to save Section B' }, { status: 500 });
  }
}
