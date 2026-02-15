import React from 'react';

export function ReferenceFormDStep({ dForm, onChange }) {
  return (
    <div className="space-y-10">
      {/* Note Box */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm text-gray-700 font-semibold mb-2">Note</p>
        <p className="text-sm text-gray-700 mb-3">
          You are required to pay a minimum of <span className="font-semibold">NGN10,000</span>{' '}
          (account opening deposit which remains your deposit) into the bank account with the
          following details:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-800">
          <div className="rounded-xl bg-gray-50 p-3">
            <div>
              <span className="font-semibold">Account Name:</span> Winview Microfinance Bank Ltd
            </div>
            <div>
              <span className="font-semibold">Account Number:</span> 0266712670
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <div>
              <span className="font-semibold">Bank:</span> GT Bank
            </div>
            <div>
              <span className="font-semibold">Sort Code:</span> 058083943
            </div>
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-800">
          <input
            type="checkbox"
            name="minDepositAcknowledged"
            checked={dForm.minDepositAcknowledged}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          I acknowledge the minimum deposit requirement.
        </label>
      </div>

      {/* Reference Form - Referee 1 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Reference Form — Referee 1</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Referee Name</label>
            <input
              type="text"
              name="r1_name"
              value={dForm.r1_name}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Enter referee's full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="r1_date"
              value={dForm.r1_date}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="r1_address"
              value={dForm.r1_address}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Referee address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
            <input
              type="text"
              name="r1_applicantName"
              value={dForm.r1_applicantName}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Name of applicant"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Office</label>
            <input
              type="text"
              name="r1_businessOffice"
              value={dForm.r1_businessOffice}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Business Office"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Applicant Signs</label>
            <textarea
              name="r1_applicantSigns"
              value={dForm.r1_applicantSigns}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 h-24"
              placeholder="Signature or description"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name of Bank</label>
              <input
                type="text"
                name="r1_bankName"
                value={dForm.r1_bankName}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                name="r1_branch"
                value={dForm.r1_branch}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account No</label>
              <input
                type="text"
                name="r1_accountNo"
                value={dForm.r1_accountNo}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Signature of Referee</label>
            <input
              type="text"
              name="r1_signatureOfReferee"
              value={dForm.r1_signatureOfReferee}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Referee signature (type name or description)"
            />
          </div>
        </div>

        {/* For Official Use */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">For Official Use</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-3">From: Winview MFB Limited</p>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  To (Referee's Bank)
                </label>
                <input
                  type="text"
                  name="r1_official_refereeBank"
                  value={dForm.r1_official_refereeBank}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700">
                  Please verify the signature(s) of your client above — signed by
                </label>
                <input
                  type="text"
                  name="r1_official_clientSignatureVerifiedBy"
                  value={dForm.r1_official_clientSignatureVerifiedBy}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-3">From: (Referee's Bank)</p>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  To (Winview Business Office)
                </label>
                <input
                  type="text"
                  name="r1_official_toBusinessOffice"
                  value={dForm.r1_official_toBusinessOffice}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700">
                  Verification Result
                </label>
                <select
                  name="r1_official_verificationResult"
                  value={dForm.r1_official_verificationResult}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black"
                >
                  <option value="">Select</option>
                  <option value="Correct">Correct</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Signed & stamped by (Authorized signatory)
                  </label>
                  <input
                    type="text"
                    name="r1_official_signedBy1"
                    value={dForm.r1_official_signedBy1}
                    onChange={onChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Signed & stamped by (Authorized signatory)
                  </label>
                  <input
                    type="text"
                    name="r1_official_signedBy2"
                    value={dForm.r1_official_signedBy2}
                    onChange={onChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reference Form — Referee 2 (duplicate of 1) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Reference Form — Referee 2</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Referee Name</label>
            <input
              type="text"
              name="r2_name"
              value={dForm.r2_name}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Enter referee's full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="r2_date"
              value={dForm.r2_date}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="r2_address"
              value={dForm.r2_address}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Referee address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
            <input
              type="text"
              name="r2_applicantName"
              value={dForm.r2_applicantName}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Name of applicant"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Office</label>
            <input
              type="text"
              name="r2_businessOffice"
              value={dForm.r2_businessOffice}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Business Office"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Applicant Signs</label>
            <textarea
              name="r2_applicantSigns"
              value={dForm.r2_applicantSigns}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400 h-24"
              placeholder="Signature or description"
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name of Bank</label>
              <input
                type="text"
                name="r2_bankName"
                value={dForm.r2_bankName}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                name="r2_branch"
                value={dForm.r2_branch}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account No</label>
              <input
                type="text"
                name="r2_accountNo"
                value={dForm.r2_accountNo}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Signature of Referee</label>
            <input
              type="text"
              name="r2_signatureOfReferee"
              value={dForm.r2_signatureOfReferee}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-400"
              placeholder="Referee signature (type name or description)"
            />
          </div>
        </div>

        {/* For Official Use */}
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">For Official Use</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-3">From: Winview MFB Limited</p>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  To (Referee's Bank)
                </label>
                <input
                  type="text"
                  name="r2_official_refereeBank"
                  value={dForm.r2_official_refereeBank}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700">
                  Please verify the signature(s) of your client above — signed by
                </label>
                <input
                  type="text"
                  name="r2_official_clientSignatureVerifiedBy"
                  value={dForm.r2_official_clientSignatureVerifiedBy}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-3">From: (Referee's Bank)</p>
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  To (Winview Business Office)
                </label>
                <input
                  type="text"
                  name="r2_official_toBusinessOffice"
                  value={dForm.r2_official_toBusinessOffice}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700">
                  Verification Result
                </label>
                <select
                  name="r2_official_verificationResult"
                  value={dForm.r2_official_verificationResult}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black"
                >
                  <option value="">Select</option>
                  <option value="Correct">Correct</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Signed & stamped by (Authorized signatory)
                  </label>
                  <input
                    type="text"
                    name="r2_official_signedBy1"
                    value={dForm.r2_official_signedBy1}
                    onChange={onChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Signed & stamped by (Authorized signatory)
                  </label>
                  <input
                    type="text"
                    name="r2_official_signedBy2"
                    value={dForm.r2_official_signedBy2}
                    onChange={onChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white p-2 text-black placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferenceFormDStep;
