import { Mail, MapPin, Phone } from 'lucide-react';

export function ContactInfoStep({ formData, onChange }) {
  // helper: always prefix Nigerian numbers with +234 and strip leading 0
  const formatNGPhone = (input) => {
    if (!input) return '';
    // keep only digits
    let digits = String(input).replace(/\D/g, '');
    if (!digits) return '';
    // if already starts with country code, drop it for normalization
    if (digits.startsWith('234')) {
      digits = digits.slice(3);
    }
    // drop a single leading 0 from local format
    if (digits.startsWith('0')) {
      digits = digits.slice(1);
    }
    return `+234${digits}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatNGPhone(e.target.value);
    // pass synthetic event up to keep parent state shape
    onChange({ target: { name: 'phone', value: formatted } });
  };

  // Professional form input styles using design tokens
  const inputClass =
    'w-full pl-14 pr-5 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 ease-out placeholder:text-neutral-500 dark:placeholder:text-neutral-400 hover:border-brand-300 dark:hover:border-brand-600';

  const textareaClass =
    'w-full pl-14 pr-5 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 ease-out resize-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 hover:border-brand-300 dark:hover:border-brand-600';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
          <Mail size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Contact Information</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">How can we reach you?</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
          <Mail size={20} />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          className={inputClass}
          placeholder="your.email@example.com"
        />
        <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Email Address
        </label>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
          <Phone size={20} />
        </div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          required
          className={inputClass}
          placeholder="+234 800 000 0000"
        />
        <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Phone Number
        </label>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-4 text-neutral-600 dark:text-neutral-400">
          <MapPin size={20} />
        </div>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          required
          rows="3"
          className={textareaClass}
          placeholder="Enter your complete address"
        />
        <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Address
        </label>
      </div>
    </div>
  );
}
