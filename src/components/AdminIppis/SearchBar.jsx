import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur rounded-2xl border border-white/60 shadow-sm px-4 py-2">
      <Search size={18} className="text-[#6E6E73]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, email, IPPIS, phone, rank, pay point..."
        className="flex-1 bg-transparent outline-none placeholder:text-[#A1A1A6] text-[#1D1D1F] py-2"
      />
    </div>
  );
}
