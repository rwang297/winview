export function exportIppisApplicationsCsv(applications) {
  try {
    const headers = [
      'ID',
      'Created At',
      'Account ID',
      'Surname',
      'First Name',
      'Middle Name',
      'APF No',
      'Rank',
      'Command/Formation',
      'Date of Enlistment',
      'Date of Retirement',
      'Residential Address',
      'Permanent Address',
      'LGA',
      'State',
      'Telephone A',
      'Telephone B',
      'Personal Email',
      'MSS/CFO',
      'IPPIS Number',
      'Pay Point',
      'Account Number',
      'Automobile Type',
      'PFA Name',
      'Pension PIN',
      'Co-operative Number',
      'Member Number',
      'Compulsory Savings',
      'Voluntary Savings',
      'Total Savings',
      'Has Police ID',
      'Payslip Months',
      'NOK Surname',
      'NOK First Name',
      'NOK Middle Name',
      'NOK Relationship',
      'NOK Address',
      'NOK Telephone',
      'NOK Email',
      'Monthly Repayment',
      'Applicant Full Name',
      'Applicant Rank',
      'Applicant Date',
      'Years Left In Service',
      'Signature',
    ];

    const rows = [
      headers,
      ...applications.map((a) => [
        a.id ?? '',
        a.created_at ? new Date(a.created_at).toISOString() : '',
        a.account_id ?? '',
        a.surname ?? '',
        a.first_name ?? '',
        a.middle_name ?? '',
        a.apf_no ?? '',
        a.rank ?? '',
        a.command_formation ?? '',
        a.date_of_enlistment ?? '',
        a.date_of_retirement ?? '',
        a.residential_address ?? '',
        a.permanent_address ?? '',
        a.lga ?? '',
        a.state ?? '',
        a.telephone_a ?? '',
        a.telephone_b ?? '',
        a.personal_email ?? '',
        a.mss_cfo ?? '',
        a.ippis_number ?? '',
        a.pay_point ?? '',
        a.account_number ?? '',
        a.automobile_type ?? '',
        a.pfa_name ?? '',
        a.pension_pin ?? '',
        a.cooperative_number ?? '',
        a.member_number ?? '',
        a.compulsory_savings ?? '',
        a.voluntary_savings ?? '',
        a.total_savings ?? '',
        a.has_police_id === true ? 'Yes' : a.has_police_id === false ? 'No' : '',
        a.current_payslip_months ?? '',
        a.nok_surname ?? '',
        a.nok_first_name ?? '',
        a.nok_middle_name ?? '',
        a.nok_relationship ?? '',
        a.nok_address ?? '',
        a.nok_telephone ?? '',
        a.nok_email ?? '',
        a.monthly_repayment ?? '',
        a.applicant_full_name ?? '',
        a.applicant_rank ?? '',
        a.applicant_date ?? '',
        a.years_left_in_service ?? '',
        a.signature ?? '',
      ]),
    ];

    const csv = rows
      .map((r) =>
        r
          .map((cell) => {
            const val = String(cell ?? '');
            if (val.includes(',') || val.includes('\n') || val.includes('"')) {
              return '"' + val.replace(/"/g, '""') + '"';
            }
            return val;
          })
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ippis_applications_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
    alert('Could not export CSV');
  }
}
