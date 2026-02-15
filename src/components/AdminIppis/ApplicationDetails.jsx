import { formatDate } from '@/utils/formatDate';

function Field({ label, value }) {
  const val = value ?? '—';
  return (
    <div>
      {/* DARKEN: field label for readability */}
      <div className="text-[#1D1D1F] uppercase tracking-widest text-[11px] font-semibold mb-1">
        {label}
      </div>
      <div className="text-[13px] text-[#1D1D1F] break-words">{String(val) || '—'}</div>
    </div>
  );
}

export function ApplicationDetails({ application }) {
  const name =
    application.applicant_full_name ||
    [application.surname, application.first_name, application.middle_name]
      .filter(Boolean)
      .join(' ');

  return (
    <div className="mt-3 p-4 bg-white rounded-2xl border border-[#E5E5E7] shadow-sm max-w-[880px]">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-[13px] text-[#1D1D1F]">
        <Field label="Record ID" value={application.id} />
        <Field label="Created At" value={formatDate(application.created_at)} />
        <Field label="Account ID" value={application.account_id} />

        <Field label="Surname" value={application.surname} />
        <Field label="First Name" value={application.first_name} />
        <Field label="Middle Name" value={application.middle_name} />
        <Field label="Applicant Full Name" value={name} />

        <Field label="APF No" value={application.apf_no} />
        <Field label="Rank" value={application.rank} />
        <Field label="Command / Formation" value={application.command_formation} />

        <Field label="Date of Enlistment" value={formatDate(application.date_of_enlistment)} />
        <Field label="Date of Retirement" value={formatDate(application.date_of_retirement)} />

        <Field label="Residential Address" value={application.residential_address} />
        <Field label="Permanent Address" value={application.permanent_address} />
        <Field label="LGA" value={application.lga} />
        <Field label="State" value={application.state} />

        <Field label="Telephone A" value={application.telephone_a} />
        <Field label="Telephone B" value={application.telephone_b} />
        <Field label="Personal Email" value={application.personal_email} />
        <Field label="MSS/CFO" value={application.mss_cfo} />

        <Field label="IPPIS Number" value={application.ippis_number} />
        <Field label="Pay Point" value={application.pay_point} />
        <Field label="Applicant Account Number" value={application.account_number} />
        <Field label="Automobile Type" value={application.automobile_type} />

        <Field label="PFA Name" value={application.pfa_name} />
        <Field label="Pension PIN" value={application.pension_pin} />
        <Field label="Co-operative Number" value={application.cooperative_number} />
        <Field label="Member Number" value={application.member_number} />

        <Field label="Compulsory Savings" value={application.compulsory_savings} />
        <Field label="Voluntary Savings" value={application.voluntary_savings} />
        <Field label="Total Savings" value={application.total_savings} />

        <Field
          label="Has Police ID"
          value={
            application.has_police_id === true
              ? 'Yes'
              : application.has_police_id === false
                ? 'No'
                : '—'
          }
        />
        <Field label="Payslip Months" value={application.current_payslip_months} />

        <Field label="NOK Surname" value={application.nok_surname} />
        <Field label="NOK First Name" value={application.nok_first_name} />
        <Field label="NOK Middle Name" value={application.nok_middle_name} />
        <Field label="NOK Relationship" value={application.nok_relationship} />
        <Field label="NOK Address" value={application.nok_address} />
        <Field label="NOK Telephone" value={application.nok_telephone} />
        <Field label="NOK Email" value={application.nok_email} />

        <Field label="Monthly Repayment" value={application.monthly_repayment} />
        <Field label="Applicant Rank (Cert)" value={application.applicant_rank} />
        <Field label="Applicant Date" value={formatDate(application.applicant_date)} />
        <Field label="Years Left in Service" value={application.years_left_in_service} />
        <Field label="Signature" value={application.signature} />
      </div>
    </div>
  );
}
