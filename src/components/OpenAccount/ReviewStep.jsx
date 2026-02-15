import { Briefcase, CreditCard, Hash } from 'lucide-react';

export function ReviewStep({ formData, onChange }) {
  const idLabel = {
    '': '',
    'national-id': 'National ID',
    'drivers-license': "Driver's License",
    'international-passport': 'International Passport',
    'voters-card': "Voter's Card",
    other: 'Other',
  }[formData.idCardType || ''];

  // ensure +234 prefix if user edits phone here
  const formatNGPhone = (input) => {
    if (!input) return '';
    let digits = String(input).replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('234')) digits = digits.slice(3);
    if (digits.startsWith('0')) digits = digits.slice(1);
    return `+234${digits}`;
  };
  const handlePhoneChange = (e) => {
    const formatted = formatNGPhone(e.target.value);
    onChange({ target: { name: 'phone', value: formatted } });
  };

  // iOS-like warm, frosted select styles for small screens
  const mobileSelectClass =
    'w-full pl-14 pr-5 py-4 rounded-2xl border text-[#1D1D1F] bg-[#FFF4E6]/80 shadow-sm backdrop-blur-[2px] transition-all cursor-pointer ' +
    'border-white/50 hover:bg-white/60 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#7b5aff]/30 ' +
    'md:bg-[#F5F5F7]/50 md:border-[#E5E5E7]';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-[#7b5aff] to-[#5ecbf7] rounded-2xl flex items-center justify-center">
          <Briefcase size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-[28px] font-semibold text-[#1D1D1F]">Occupation & Review</h2>
          <p className="text-[15px] text-[#86868b]">Final details and confirmation</p>
        </div>
      </div>

      {/* Occupation */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Briefcase size={20} className="text-[#86868b]" />
        </div>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={onChange}
          required
          className="w-full pl-14 pr-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out placeholder:text-gray-400 hover:border-[#7b5aff]/30"
          placeholder="e.g., Software Engineer, Teacher, etc."
        />
        <label className="absolute -top-2 left-4 bg-white px-2 text-[13px] font-medium text-[#86868b]">
          Occupation
        </label>
      </div>

      {/* UPDATED: ID Card Type & ID Card Number */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <CreditCard size={20} className="text-[#86868b]" />
          </div>
          <select
            name="idCardType"
            value={formData.idCardType}
            onChange={onChange}
            className={mobileSelectClass}
          >
            <option value="">Select ID Card Type</option>
            <option value="national-id">National ID</option>
            <option value="drivers-license">Driver's License</option>
            <option value="international-passport">International Passport</option>
            <option value="voters-card">Voter's Card</option>
            <option value="other">Other</option>
          </select>
          <label className="absolute -top-2 left-4 bg-white px-2 text-[13px] font-medium text-[#86868b]">
            ID Card Type (optional)
          </label>
          {idLabel && (
            <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#E5E5E7] bg-white text-[#1D1D1F] text-xs">
              <span>{idLabel}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Hash size={20} className="text-[#86868b]" />
          </div>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={onChange}
            className="w-full pl-14 pr-5 py-4 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl text-[17px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out placeholder:text-gray-400 hover:border-[#7b5aff]/30"
            placeholder="Enter ID card number"
          />
          <label className="absolute -top-2 left-4 bg-white px-2 text-[13px] font-medium text-[#86868b]">
            ID Card Number (optional)
          </label>
        </div>
      </div>

      {/* Editable Review Summary */}
      <div className="mt-8 p-8 bg-[#F5F5F7]/50 rounded-[24px] border border-[#E5E5E7] hover:border-[#7b5aff]/30 transition-all duration-300">
        <h3 className="text-[19px] font-semibold text-[#1D1D1F] mb-6">
          Review & Edit Your Information
        </h3>
        <p className="text-[15px] text-[#86868b] mb-6">
          You can make final adjustments to your information below before submitting.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30"
              placeholder="+234 800 000 0000"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
              required
              min="18"
              max="120"
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30"
              placeholder="25"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30 md:w-full md:px-4 md:py-3 md:bg-white md:border-[#E5E5E7] md:rounded-xl md:text-[16px] md:text-[#1D1D1F]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out hover:border-[#7b5aff]/30"
              placeholder="Software Engineer"
            />
          </div>

          {/* Mirror new fields inside the summary as well if needed later */}
        </div>

        <div className="mt-6">
          <label className="block text-[13px] font-medium text-[#86868b] mb-2 uppercase tracking-wide">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            rows="3"
            className="w-full px-4 py-3 bg-white border border-[#E5E5E7] rounded-xl text-[16px] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#7b5aff] focus:border-transparent transition-all duration-300 ease-out resize-none hover:border-[#7b5aff]/30"
            placeholder="123 Main Street, City, State, ZIP"
          />
        </div>
      </div>
    </div>
  );
}
