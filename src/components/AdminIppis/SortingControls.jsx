import { ArrowUpDown } from 'lucide-react';

export function SortingControls({ sortBy, setSortBy, sortDir, setSortDir }) {
  return (
    <div className="flex items-center gap-2 bg-white/90 rounded-2xl border border-white/60 shadow-sm px-3 py-2">
      <ArrowUpDown size={16} className="text-[#6E6E73]" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-transparent outline-none"
      >
        <option value="created_at">Newest</option>
        <option value="rank">Rank</option>
        <option value="pay_point">Pay Point</option>
        <option value="state">State</option>
        <option value="monthly_repayment">Monthly Repayment</option>
        <option value="total_savings">Total Savings</option>
      </select>
      <select
        value={sortDir}
        onChange={(e) => setSortDir(e.target.value)}
        className="bg-transparent outline-none"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
