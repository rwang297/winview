import { FilterIcon } from 'lucide-react';

export function FilterDropdown({ label, value, onChange, options, icon: Icon = FilterIcon }) {
  return (
    <div className="bg-white/90 rounded-2xl border border-white/60 shadow-sm px-4 py-2">
      <div className="text-[11px] uppercase tracking-widest text-[#6E6E73] font-semibold mb-1 flex items-center gap-2">
        <Icon size={12} /> {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
