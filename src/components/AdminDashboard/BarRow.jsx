export function BarRow({ label, count, total, gradient }) {
  const pct = Math.max(Math.min((count / Math.max(total || 1, 1)) * 100, 100), 0);
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 text-[14px] text-[#1D1D1F] truncate" title={label}>
        {label}
      </span>
      <div className="flex-1 h-4 bg-white rounded-full overflow-hidden border border-[#E5E5E7]">
        <div className={`h-full bg-gradient-to-r ${gradient}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-12 text-right text-[14px] font-semibold text-[#1D1D1F]">{count}</span>
    </div>
  );
}
