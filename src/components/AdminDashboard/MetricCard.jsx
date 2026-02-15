export function MetricCard({ title, value, icon, gradient }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm font-medium text-[#1D1D1F] uppercase tracking-wide">{title}</div>
        {/* icon rendered with neutral style; gradient intentionally unused for minimal look */}
        <div className="flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
        {value}
      </div>
    </div>
  );
}
