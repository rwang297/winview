'use client';

import useUpload from '@/utils/useUpload';
import { useCallback, useState } from 'react';

export function AccountMandateCTermsStep({ cForm, onChange }) {
  const [error, setError] = useState(null);
  const [upload, { loading }] = useUpload();

  const handleUploadFromUrl = useCallback(
    async (field, urlValue) => {
      setError(null);
      if (!urlValue) return;
      try {
        const { url, error: uploadErr } = await upload({ url: urlValue });
        if (uploadErr) {
          setError(uploadErr);
          return;
        }
        onChange({ target: { name: field, value: url, type: 'text' } });
      } catch (e) {
        console.error(e);
        setError('Could not upload image. Please check the link and try again.');
      }
    },
    [upload, onChange]
  );

  return (
    <div className="space-y-10">
      {/* Section Title */}
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-black">
          Section C: Account Mandate, Documents and Terms
        </h2>
        <p className="text-sm text-gray-600">
          Fill this part to complete your account opening. You can paste image links for signature
          and passport photo now; we can enable file uploads next if you prefer.
        </p>
      </div>

      {/* 4. Account Mandate */}
      <div className="border border-black/10 rounded-2xl p-6 bg-white/70">
        <h3 className="text-lg font-bold text-black mb-4">4. Account Mandate</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Date Account Opened
            </label>
            <input
              type="date"
              name="dateAccountOpened"
              value={cForm.dateAccountOpened}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]/30 bg-white text-black placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Signature Specimen (image URL)
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                name="signatureUrl"
                placeholder="https://example.com/signature.jpg"
                value={cForm.signatureUrl}
                onChange={onChange}
                className="flex-1 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]/30 bg-white text-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => handleUploadFromUrl('signatureUrl', cForm.signatureUrl)}
                className="px-4 py-3 rounded-xl bg-black text-white font-semibold disabled:opacity-60"
                disabled={loading || !cForm.signatureUrl}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {cForm.signatureUrl ? (
              <div className="mt-3">
                <img
                  src={cForm.signatureUrl}
                  alt="Signature preview"
                  className="h-24 rounded-lg border border-black/10 object-contain bg-white"
                />
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Passport Photograph (image URL)
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                name="passportPhotoUrl"
                placeholder="https://example.com/photo.jpg"
                value={cForm.passportPhotoUrl}
                onChange={onChange}
                className="flex-1 px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#7b5aff]/30 bg-white text-black placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => handleUploadFromUrl('passportPhotoUrl', cForm.passportPhotoUrl)}
                className="px-4 py-3 rounded-xl bg-black text-white font-semibold disabled:opacity-60"
                disabled={loading || !cForm.passportPhotoUrl}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {cForm.passportPhotoUrl ? (
              <div className="mt-3">
                <img
                  src={cForm.passportPhotoUrl}
                  alt="Passport preview"
                  className="h-24 rounded-lg border border-black/10 object-cover bg-white"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 5. Required Documentation (Savings) */}
      <div className="border border-black/10 rounded-2xl p-6 bg-white/70">
        <h3 className="text-lg font-bold text-black mb-4">5. Required Documentation (Savings)</h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="docTwoPassports"
              checked={cForm.docTwoPassports}
              onChange={onChange}
              className="mt-1"
            />
            <span className="text-sm text-gray-800">
              Two passport photographs showing full face forward with full name and signature
              written at the back
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-start gap-3 md:col-span-2">
              <input
                type="checkbox"
                name="docValidId"
                checked={cForm.docValidId}
                onChange={onChange}
                className="mt-1"
              />
              <span className="text-sm text-gray-800">Valid identification for each signatory</span>
            </label>
            <select
              name="docIdType"
              value={cForm.docIdType}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black"
            >
              <option value="">Select ID type</option>
              <option value="passport">International Passport</option>
              <option value="drivers">National Driver's License</option>
              <option value="nationalId">National ID</option>
              <option value="voters">Voter's Card</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="docIdNumber"
              placeholder="ID Number"
              value={cForm.docIdNumber}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-gray-400"
            />
            <input
              type="text"
              name="docIssueState"
              placeholder="Issue State"
              value={cForm.docIssueState}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-gray-400"
            />
            <input
              type="date"
              name="docExpiryDate"
              placeholder="Expiry Date"
              value={cForm.docExpiryDate}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-gray-400"
            />
          </div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="docUtilityBill"
              checked={cForm.docUtilityBill}
              onChange={onChange}
              className="mt-1"
            />
            <span className="text-sm text-gray-800">
              Copy of utility bill issued within the last three months
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="docTwoReferences"
              checked={cForm.docTwoReferences}
              onChange={onChange}
              className="mt-1"
            />
            <span className="text-sm text-gray-800">
              Two reference forms duly completed (for current account)
            </span>
          </label>
        </div>
      </div>

      {/* 6. Terms and Conditions */}
      <div className="border border-black/10 rounded-2xl p-6 bg-white/70">
        <h3 className="text-lg font-bold text-black mb-4">6. Terms and Conditions</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            By proceeding, you request and authorize Winview Microfinance Bank to open and maintain
            the selected account in your name and agree to the cooperative rules and requirements,
            including providing true and valid information.
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>All funds credited are payable only in local currency in circulation.</li>
            <li>Notify the bank of any change in information or address.</li>
            <li>Statements will be sent to the provided address or email.</li>
            <li>
              Cheques cannot be paid into the savings account except where applicable by product
              rules.
            </li>
          </ul>
        </div>

        <div className="mt-5 space-y-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={cForm.termsAccepted}
              onChange={onChange}
              className="mt-1"
            />
            <span className="text-sm text-gray-800">
              I have read and agree to the Terms and Conditions.
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="customerSignatureName"
              placeholder="Customer's Signature (type full name)"
              value={cForm.customerSignatureName}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-gray-400"
            />
            <input
              type="date"
              name="customerSignatureDate"
              placeholder="Date"
              value={cForm.customerSignatureDate}
              onChange={onChange}
              className="px-4 py-3 rounded-xl border border-black/10 bg-white text-black placeholder:text-gray-400"
            />
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="noteAcknowledged"
                checked={cForm.noteAcknowledged}
                onChange={onChange}
                className="mt-1"
              />
              <span className="text-sm text-gray-800">
                I acknowledge the minimum opening deposit requirement (NGN10,000).
              </span>
            </label>
          </div>
        </div>
      </div>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}
    </div>
  );
}

export default AccountMandateCTermsStep;
