import { ChevronLeft, FileText, List, ShieldCheck, User, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

export function IppisFormStep({ ippisForm, onChange, onCompleteSections }) {
  const [activeSection, setActiveSection] = useState(0); // 0: personal, 1: requirements, 2: nok, 3: cert

  const sections = useMemo(
    () => [
      {
        id: 'ippis-section-personal',
        label: 'Personal information',
        icon: User,
      },
      {
        id: 'ippis-section-requirements',
        label: 'Personal requirements',
        icon: List,
      },
      { id: 'ippis-section-nok', label: 'Next of kin', icon: Users },
      { id: 'ippis-section-cert', label: 'Certification', icon: ShieldCheck },
    ],
    []
  );

  const goTo = (i) => setActiveSection(Math.max(0, Math.min(3, i)));
  const onContinue = () => {
    if (activeSection < sections.length - 1) {
      goTo(activeSection + 1);
    } else {
      // last section complete -> notify parent to advance to next main step
      if (typeof onCompleteSections === 'function') onCompleteSections();
    }
  };

  // NEW: iOS-style local mini progress
  const stepLabel = `${activeSection + 1} of ${sections.length}`;
  const progressPct = ((activeSection + 1) / sections.length) * 100;

  // UPDATED: Footer navigation for sub-pages with Back/Next
  const FooterNav = ({ nextLabel }) => (
    <div className="flex items-center justify-between mt-6">
      <button
        type="button"
        onClick={() => goTo(activeSection - 1)}
        disabled={activeSection === 0}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] transition ${
          activeSection === 0
            ? 'opacity-40 cursor-not-allowed border-[#E5E5E7] text-[#86868b]'
            : 'border-[#E5E5E7] text-[#1D1D1F] hover:bg-white'
        }`}
        aria-label="Go to previous section"
      >
        <ChevronLeft size={16} className="opacity-70" />
        Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#007AFF] text-white text-[14px] font-semibold shadow-lg shadow-[#007AFF]/20 hover:bg-[#0051D5] transition-all active:scale-95"
      >
        {nextLabel}
      </button>
    </div>
  );

  return (
    // Remove non-tailwind animation utility classes to avoid broken styles
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7b5aff] to-[#5ecbf7] rounded-2xl flex items-center justify-center">
          <FileText size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-[28px] font-semibold text-[#1D1D1F]">IPPIS Loan Application</h2>
          {/* DARKEN subtitle */}
          <p className="text-[15px] text-[#1D1D1F]">Fill out the extended details from your form</p>
        </div>
      </div>

      {/* Sticky chips + mini progress (iOS segmented feel) */}
      <div className="sticky top-0 z-10 -mx-8 md:-mx-10 px-8 md:px-10 pt-4 pb-3 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-white/60">
        <div className="flex flex-wrap items-center gap-2">
          {sections.map(({ id, label, icon: Icon }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(i)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] shadow-sm transition ${
                activeSection === i
                  ? 'bg-[#007AFF]/10 border-[#007AFF]/30 text-[#007AFF]'
                  : 'bg-white border-[#E5E5E7] text-[#1D1D1F] hover:bg-white'
              }`}
              aria-current={activeSection === i ? 'step' : undefined}
            >
              <Icon size={14} className="opacity-70" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="mt-3">
          {/* DARKEN mini progress texts */}
          <div className="flex items-center justify-between text-[12px] text-[#1D1D1F] mb-1">
            <span>Section</span>
            <span>{stepLabel}</span>
          </div>
          <div className="w-full h-1.5 bg-[#E5E5E7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#007AFF] rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div id="ippis-section-personal" className={`${activeSection === 0 ? 'block' : 'hidden'}`}>
        <h3 className="text-[16px] font-semibold text-[#1D1D1F] mb-4">Personal Information</h3>
        <div className="space-y-6">
          {/* Names */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            {/* DARKEN group label */}
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">Names</div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative">
                <input
                  name="surname"
                  value={ippisForm.surname}
                  onChange={onChange}
                  className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]"
                  placeholder="Surname"
                />
              </div>
              <div className="relative">
                <input
                  name="firstName"
                  value={ippisForm.firstName}
                  onChange={onChange}
                  className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]"
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <input
                  name="middleName"
                  value={ippisForm.middleName}
                  onChange={onChange}
                  className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]"
                  placeholder="Middle Name"
                />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Service details
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="apfNo"
                value={ippisForm.apfNo}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="AP/F/No"
              />
              <input
                name="rank"
                value={ippisForm.rank}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Rank"
              />
              <input
                name="commandFormation"
                value={ippisForm.commandFormation}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Command/Formation"
              />
            </div>
          </div>

          {/* Service Dates */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Service dates
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] text-[#1D1D1F] mb-2">Date of Enlistment</label>
                <input
                  type="date"
                  name="dateOfEnlistment"
                  value={ippisForm.dateOfEnlistment}
                  onChange={onChange}
                  className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#1D1D1F] mb-2">
                  Expected Retirement Date
                </label>
                <input
                  type="date"
                  name="dateOfRetirement"
                  value={ippisForm.dateOfRetirement}
                  onChange={onChange}
                  className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black"
                />
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">Addresses</div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="residentialAddress"
                value={ippisForm.residentialAddress}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Residential Address"
              />
              <input
                name="permanentAddress"
                value={ippisForm.permanentAddress}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Permanent Address"
              />
            </div>
          </div>

          {/* Location & Contact */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Location & Contact
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="lga"
                value={ippisForm.lga}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="LGA"
              />
              <input
                name="state"
                value={ippisForm.state}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="State"
              />
              <input
                name="personalEmail"
                value={ippisForm.personalEmail}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Personal Email"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <input
                name="telephoneA"
                value={ippisForm.telephoneA}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Telephone (A)"
              />
              <input
                name="telephoneB"
                value={ippisForm.telephoneB}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Telephone (B)"
              />
              <input
                name="mssCfo"
                value={ippisForm.mssCfo}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="MSS/CFO"
              />
            </div>
          </div>

          {/* Identifiers & Banking */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Identifiers & banking
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="ippisNumber"
                value={ippisForm.ippisNumber}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="IPPIS Number"
              />
              <input
                name="payPoint"
                value={ippisForm.payPoint}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Pay Point"
              />
              <input
                name="accountNumber"
                value={ippisForm.accountNumber}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Account Number"
              />
            </div>
          </div>

          {/* Automobile Type */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            {/* DARKEN label */}
            <label className="block text-[12px] tracking-wide text-[#1D1D1F] mb-2 uppercase">
              Type of Automobile Applied For
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { key: 'suzuki_minibus', label: 'Suzuki Mini Bus 🚐' },
                { key: 'tvs_tricycle', label: 'TVS Tricycle 🛺' },
                { key: 'bajaj_motorcycle', label: 'Bajaj Motorcycle 🏍️' },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-colors ${
                    ippisForm.automobileType === opt.key
                      ? 'border-[#7b5aff] bg-[#7b5aff]/5'
                      : 'border-[#E5E5E7] hover:border-[#7b5aff]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="automobileType"
                    value={opt.key}
                    checked={ippisForm.automobileType === opt.key}
                    onChange={onChange}
                  />
                  <span className="text-[14px] text-[#1D1D1F]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* UPDATED footer nav */}
        <FooterNav nextLabel="Continue to Personal requirements" />
      </div>

      {/* Personal Requirements */}
      <div
        id="ippis-section-requirements"
        className={`${activeSection === 1 ? 'block' : 'hidden'}`}
      >
        <h3 className="text-[16px] font-semibold text-[#1D1D1F] mb-4">Personal Requirements</h3>
        <div className="space-y-6">
          {/* Pension & Membership */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Pension & membership
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="pfaName"
                value={ippisForm.pfaName}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="PFA Name"
              />
              <input
                name="pensionPIN"
                value={ippisForm.pensionPIN}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Pension PIN"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <input
                name="cooperativeNumber"
                value={ippisForm.cooperativeNumber}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Co-operative Number"
              />
              <input
                name="memberNumber"
                value={ippisForm.memberNumber}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Member's Number"
              />
            </div>
          </div>

          {/* Savings */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">Savings</div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="compulsorySavings"
                value={ippisForm.compulsorySavings}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Compulsory Savings (₦)"
              />
              <input
                name="voluntarySavings"
                value={ippisForm.voluntarySavings}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Voluntary Savings (₦)"
              />
              <input
                name="totalSavings"
                value={ippisForm.totalSavings}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Total (₦)"
              />
            </div>
          </div>

          {/* Verification */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Verification
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <label className="flex items-center gap-3 text-[14px] text-[#1D1D1F]">
                <input
                  type="checkbox"
                  name="hasPoliceId"
                  checked={ippisForm.hasPoliceId}
                  onChange={onChange}
                />
                Current Police ID Card Available
              </label>
              <input
                name="currentPayslipMonths"
                value={ippisForm.currentPayslipMonths}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Current Payslip (months)"
              />
            </div>
          </div>
        </div>
        <FooterNav nextLabel="Continue to Next of kin" />
      </div>

      {/* Next of Kin */}
      <div id="ippis-section-nok" className={`${activeSection === 2 ? 'block' : 'hidden'}`}>
        <h3 className="text-[16px] font-semibold text-[#1D1D1F] mb-4">Details of Next of Kin</h3>
        <div className="space-y-6">
          {/* Names */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">Names</div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="nokSurname"
                value={ippisForm.nokSurname}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Surname"
              />
              <input
                name="nokFirstName"
                value={ippisForm.nokFirstName}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="First Name"
              />
              <input
                name="nokMiddleName"
                value={ippisForm.nokMiddleName}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Middle Name"
              />
            </div>
          </div>

          {/* Relationship & Telephone */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Relationship & contact
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="nokRelationship"
                value={ippisForm.nokRelationship}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Relationship"
              />
              <input
                name="nokTelephone"
                value={ippisForm.nokTelephone}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Telephone"
              />
            </div>
          </div>

          {/* Address & Email */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Address & email
            </div>
            <div className="grid md:grid-cols-1 gap-6">
              <input
                name="nokAddress"
                value={ippisForm.nokAddress}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Address"
              />
              <input
                name="nokEmail"
                value={ippisForm.nokEmail}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <FooterNav nextLabel="Continue to Beneficiary certification" />
      </div>

      {/* Certification */}
      <div id="ippis-section-cert" className={`${activeSection === 3 ? 'block' : 'hidden'}`}>
        <h3 className="text-[16px] font-semibold text-[#1D1D1F] mb-4">Beneficiary Certification</h3>
        <div className="space-y-6">
          {/* Repayment & Service */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Repayment & service
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="monthlyRepayment"
                value={ippisForm.monthlyRepayment}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Monthly Loan Repayment (₦)"
              />
              <input
                name="yearsLeftInService"
                value={ippisForm.yearsLeftInService}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Years Left in Service"
              />
              <div>
                <label className="block text-[13px] text-[#1D1D1F] mb-2">Application Date</label>
                <input
                  type="date"
                  name="applicantDate"
                  value={ippisForm.applicantDate}
                  onChange={onChange}
                  className="w-full px-5 py-3.5 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black"
                />
              </div>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="rounded-2xl border border-[#E5E5E7] bg-white p-4">
            <div className="text-[12px] tracking-wide text-[#1D1D1F] mb-3 uppercase">
              Applicant details
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <input
                name="applicantFullName"
                value={ippisForm.applicantFullName}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Applicant's Full Name"
              />
              <input
                name="applicantRank"
                value={ippisForm.applicantRank}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Rank"
              />
              <input
                name="signature"
                value={ippisForm.signature}
                onChange={onChange}
                className="w-full px-5 py-4 bg-[#F5F5F7] border border-[#E5E5E7] rounded-2xl text-[15px] text-black placeholder:text-gray-400"
                placeholder="Signature (type your name)"
              />
            </div>
            {/* DARKEN disclaimer */}
            <p className="mt-3 text-[13px] text-[#1D1D1F]">
              By proceeding, you certify that the information provided is true and authorize Winview
              Microfinance to verify details as necessary.
            </p>
          </div>
        </div>
        <FooterNav nextLabel="Continue to Section B" />
      </div>
    </div>
  );
}
