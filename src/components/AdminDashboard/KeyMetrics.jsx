export function KeyMetrics({ metrics, winviewGradient }) {
  // Color-coded compact chip for the single-row layout with strong, readable text
  const Chip = ({ label, value, variant = 'neutral' }) => {
    const variants = {
      accounts:
        // Increase contrast and remove dark-mode overrides to keep text crisp on warm background
        'border-blue-200 bg-blue-50 text-blue-800',
      month: 'border-green-200 bg-green-50 text-green-800',
      complaints: 'border-rose-200 bg-rose-50 text-rose-800',
      ippis: 'border-purple-200 bg-purple-50 text-purple-800',
      neutral: 'border-[#E5E7EB] bg-white text-[#0B0B0E]',
    };

    const classes = variants[variant] || variants.neutral;

    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm ${classes}`}
        aria-label={`${label}: ${value ?? 0}`}
      >
        <span className="text-[11px] font-medium tracking-wide uppercase">{label}</span>
        <span className="text-[14px] font-semibold">{value ?? 0}</span>
      </div>
    );
  };

  return (
    <>
      {/* Single row with different chips (horizontally scrollable on small screens) */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-stretch gap-3 min-w-max">
          <Chip label="Total Accounts" value={metrics?.totalAccounts} variant="accounts" />
          <Chip label="New This Month" value={metrics?.thisMonth} variant="month" />
          <Chip label="Total Complaints" value={metrics?.totalComplaints} variant="complaints" />
          <Chip
            label="Hire Purchase Applications"
            value={metrics?.totalIppisApplications}
            variant="ippis"
          />
        </div>
      </div>
    </>
  );
}
