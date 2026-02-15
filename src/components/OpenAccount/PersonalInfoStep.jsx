import { Calendar, Heart, User } from 'lucide-react';

export function PersonalInfoStep({ formData, onChange }) {
  // Professional form input styles using design tokens
  const inputClass =
    'w-full pl-14 pr-5 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 ease-out placeholder:text-neutral-500 dark:placeholder:text-neutral-400 hover:border-brand-300 dark:hover:border-brand-600';

  const selectClass =
    'w-full pl-14 pr-5 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent hover:border-brand-300 dark:hover:border-brand-600';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
          <User size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Personal Information</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Tell us about yourself</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
          <User size={20} />
        </div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          required
          className={inputClass}
          placeholder="Enter your full name"
        />
        <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-all">
          Full Name
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
            <Calendar size={20} />
          </div>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={onChange}
            required
            min="18"
            max="120"
            className={inputClass}
            placeholder="Age"
          />
          <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Age
          </label>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-600 dark:text-neutral-400">
            <Heart size={20} />
          </div>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            required
            className={selectClass}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          <label className="absolute -top-2 left-4 bg-white dark:bg-neutral-900 px-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
            Gender
          </label>
        </div>
      </div>
    </div>
  );
}
