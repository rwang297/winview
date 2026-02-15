import React from 'react';

export function AccountOpeningBStep({ bForm, onChange }) {
  // small helper to render a checkbox
  const Check = ({ name, label }) => (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        name={name}
        checked={!!bForm[name]}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300"
      />
      <span>{label}</span>
    </label>
  );

  // radio for gender
  const Radio = ({ name, value, label }) => (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input
        type="radio"
        name={name}
        value={value}
        checked={bForm[name] === value}
        onChange={onChange}
        className="w-4 h-4 border-gray-300"
      />
      <span>{label}</span>
    </label>
  );

  // phone formatter: auto-prefix +234 and normalize local numbers
  const formatNGPhone = (input) => {
    if (!input) return '';
    let digits = String(input).replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('234')) digits = digits.slice(3);
    if (digits.startsWith('0')) digits = digits.slice(1);
    return `+234${digits}`;
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    const formatted = formatNGPhone(value);
    onChange({ target: { name, value: formatted } });
  };

  // NEW: derive a single "Mode of Identification" from existing boolean fields
  const selectedIdMode = bForm.idDrivers
    ? 'drivers'
    : bForm.idPassport
      ? 'passport'
      : bForm.idNational
        ? 'national'
        : bForm.idVoters
          ? 'voters'
          : '';

  // NEW: handler to update underlying boolean flags when mode changes
  const handleIdModeChange = (e) => {
    const value = e.target.value;
    const makeEvt = (name, checked) => ({
      target: { name, type: 'checkbox', checked },
    });
    // ensure only one is true at a time
    onChange(makeEvt('idDrivers', value === 'drivers'));
    onChange(makeEvt('idPassport', value === 'passport'));
    onChange(makeEvt('idNational', value === 'national'));
    onChange(makeEvt('idVoters', value === 'voters'));
  };

  // iOS-like warm, frosted select styles for small screens
  const mobileSelectClass =
    'mt-1 w-full px-4 py-3 rounded-2xl border text-black bg-[#FFF4E6]/80 shadow-sm backdrop-blur-[2px] transition-all cursor-pointer ' +
    'border-white/50 hover:bg-white/60 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:backdrop-blur-md active:backdrop-blur-md ' +
    'md:bg-white md:border-gray-300 md:rounded-lg';

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0A0A0B]">
          Section B: Account Opening
        </h2>
        <span className="text-xs text-gray-500">Complete in CAPITAL letters</span>
      </div>

      {/* Category of Account */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0B]">
          Category of Account
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3 p-4 rounded-2xl border border-gray-200 bg-white">
            <p className="text-xs font-semibold text-gray-600">Ownership</p>
            <div className="flex flex-wrap gap-4">
              <Check name="typeIndividual" label="Individual" />
              <Check name="typeJoint" label="Joint" />
              <div className="flex items-center gap-2 text-sm text-gray-700 w-full">
                <span className="whitespace-nowrap">Name of Account</span>
                <input
                  type="text"
                  name="nameOfAccount"
                  value={bForm.nameOfAccount || ''}
                  onChange={onChange}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-2xl border border-gray-200 bg-white">
            <p className="text-xs font-semibold text-gray-600">Product</p>
            <div className="grid grid-cols-2 gap-3">
              <Check name="prodStandardSaving" label="Standard Saving" />
              <Check name="prodAssusu" label="Assusu" />
              <Check name="prodTarget" label="Target" />
              <Check name="prodKiddies" label="Kiddies" />
              <Check name="prodMicroCredit" label="Micro Credit" />
              <Check name="prodSaveSmile" label="Save & Smile" />
              <Check name="prodCurrent" label="Current" />
            </div>
          </div>

          <div className="space-y-3 p-4 rounded-2xl border border-gray-200 bg-white">
            <p className="text-xs font-semibold text-gray-600">Branch & IDs</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Branch</span>
                <input
                  type="text"
                  name="branch"
                  value={bForm.branch || ''}
                  onChange={onChange}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">BVN</span>
                <input
                  type="text"
                  name="bvn"
                  value={bForm.bvn || ''}
                  onChange={onChange}
                  inputMode="numeric"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Account Number (office use)</span>
                <input
                  type="text"
                  name="accountNumberOffice"
                  value={bForm.accountNumberOffice || ''}
                  onChange={onChange}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0B]">
          1. Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={bForm.title || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">Surname</label>
            <input
              type="text"
              name="surname"
              value={bForm.surname || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={bForm.firstName || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">Other Names</label>
            <input
              type="text"
              name="otherNames"
              value={bForm.otherNames || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">Mother Maiden Name</label>
            <input
              type="text"
              name="motherMaidenName"
              value={bForm.motherMaidenName || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-xs font-semibold text-gray-600">Nick Name</label>
            <input
              type="text"
              name="nickName"
              value={bForm.nickName || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={bForm.dob || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Gender</label>
            <div className="mt-1 flex items-center gap-6 px-3 py-2 rounded-lg border border-gray-200 bg-white">
              <Radio name="gender" value="F" label="F" />
              <Radio name="gender" value="M" label="M" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Place of Birth</label>
            <input
              type="text"
              name="placeOfBirth"
              value={bForm.placeOfBirth || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={bForm.nationality || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">State of Origin</label>
            <input
              type="text"
              name="stateOfOrigin"
              value={bForm.stateOfOrigin || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Home Town</label>
            <input
              type="text"
              name="homeTown"
              value={bForm.homeTown || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Marital Status</label>
            <select
              name="maritalStatus"
              value={bForm.maritalStatus || ''}
              onChange={onChange}
              className={mobileSelectClass}
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Others</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Phone No 1</label>
            <input
              type="tel"
              name="phone1"
              value={bForm.phone1 || ''}
              onChange={handlePhoneChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              placeholder="+234 800 000 0000"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Phone No 2</label>
            <input
              type="tel"
              name="phone2"
              value={bForm.phone2 || ''}
              onChange={handlePhoneChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Residential Address</label>
            <input
              type="text"
              name="residentialAddress"
              value={bForm.residentialAddress || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">State</label>
              <input
                type="text"
                name="state"
                value={bForm.state || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Local Govt</label>
              <input
                type="text"
                name="localGovt"
                value={bForm.localGovt || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">District</label>
              <input
                type="text"
                name="district"
                value={bForm.district || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Town</label>
              <input
                type="text"
                name="town"
                value={bForm.town || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={bForm.landmark || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-600">Means of Identity</label>
          {/* NEW: Single-select mode of identification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-600">Mode of Identification</label>
              <select
                value={selectedIdMode}
                onChange={handleIdModeChange}
                className={mobileSelectClass}
              >
                <option value="">Select</option>
                <option value="drivers">Driver's License</option>
                <option value="passport">International Passport</option>
                <option value="national">National I.D Card</option>
                <option value="voters">Voter's Card</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-gray-600">Card Number</label>
              <input
                type="text"
                name="idNumber"
                value={bForm.idNumber || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
                placeholder="Enter card number"
              />
            </div>
          </div>
          {/* Keep original checkboxes for completeness/compatibility */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 rounded-2xl border border-gray-200 bg-white">
            <Check name="idNational" label="National ID" />
            <Check name="idDrivers" label="Driver's License" />
            <Check name="idPassport" label="International Passport" />
            <Check name="idVoters" label="Voter's Card" />
            <Check name="idOther" label="Others" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Card Number</label>
              <input
                type="text"
                name="idNumber"
                value={bForm.idNumber || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">ID Issue State</label>
              <input
                type="text"
                name="idIssueState"
                value={bForm.idIssueState || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Expires Date</label>
              <input
                type="date"
                name="idExpires"
                value={bForm.idExpires || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Test Question</label>
              <input
                type="text"
                name="testQuestion"
                value={bForm.testQuestion || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Test Answer</label>
              <input
                type="text"
                name="testAnswer"
                value={bForm.testAnswer || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Purpose of Account</label>
              <input
                type="text"
                name="purposeOfAccount"
                value={bForm.purposeOfAccount || ''}
                onChange={onChange}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next of Kin */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0B]">
          2. Details of Next of Kin
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="nokName"
              value={bForm.nokName || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Relationship</label>
            <input
              type="text"
              name="nokRelationship"
              value={bForm.nokRelationship || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Telephone Number</label>
            <input
              type="tel"
              name="nokTelephone"
              value={bForm.nokTelephone || ''}
              onChange={handlePhoneChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="nokDob"
              value={bForm.nokDob || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-end">
            <div className="w-full">
              <label className="text-xs font-semibold text-gray-600">Gender</label>
              <div className="mt-1 flex items-center gap-6 px-3 py-2 rounded-lg border border-gray-200 bg-white">
                <Radio name="nokGender" value="F" label="F" />
                <Radio name="nokGender" value="M" label="M" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-600">Residential Address</label>
            <input
              type="text"
              name="nokAddress"
              value={bForm.nokAddress || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Email Address</label>
            <input
              type="email"
              name="nokEmail"
              value={bForm.nokEmail || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Nationality</label>
            <input
              type="text"
              name="nokNationality"
              value={bForm.nokNationality || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">State of Origin</label>
            <input
              type="text"
              name="nokStateOfOrigin"
              value={bForm.nokStateOfOrigin || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Local Govt</label>
            <input
              type="text"
              name="nokLocalGovt"
              value={bForm.nokLocalGovt || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Home Town</label>
            <input
              type="text"
              name="nokHomeTown"
              value={bForm.nokHomeTown || ''}
              onChange={onChange}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 text-black placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Account Services Required */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A0A0B]">
          3. Account Service(s) Required
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl border border-gray-200 bg-white">
          <Check name="svcAtmCard" label="ATM Card (NGN)" />
          <Check name="svcSmsAlert" label="Assurance SMS Alert" />
          <Check name="svcEmailAlert" label="Assurance Email Notification Alert" />
          <Check name="svcOthers" label="Others" />
          <Check name="svcMobileBanking" label="Mobile Banking" />
          <Check name="svcMailStatement" label="Mail Statement" />
        </div>
      </section>
    </div>
  );
}
