import { Eye } from 'lucide-react';

export function LatestComplaints({ complaints, loading, error }) {
  // Only show up to 5, in case API returns more
  const items = Array.isArray(complaints) ? complaints.slice(0, 5) : [];

  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight">
          Latest Complaints
        </h2>
        {/* Placeholder link (no admin complaints list page yet) */}
        <span className="text-[#0A84FF]/50 text-[14px] cursor-not-allowed select-none">
          View all
        </span>
      </div>

      {loading ? (
        <div className="text-[#1D1D1F]">Loading latest…</div>
      ) : error ? (
        <div className="text-[#FF3B30]">Failed to load complaints.</div>
      ) : items.length === 0 ? (
        <div className="text-[#1D1D1F]">No recent complaints.</div>
      ) : (
        <div className="divide-y divide-[#E5E5E7]">
          {items.map((c) => {
            const created = c.created_at ? new Date(c.created_at).toLocaleString() : '';
            const name = c.name || '—';
            const meta = [c.email, c.phone].filter(Boolean).join(' • ');
            const category = c.category ? c.category : 'unspecified';
            const initial = String(name || '?')
              .charAt(0)
              .toUpperCase();

            return (
              <div key={c.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center font-bold">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-[#1D1D1F] truncate">{name}</div>
                    <div className="text-[12px] text-[#1D1D1F] truncate">{meta || '—'}</div>
                    <div className="text-[12px] text-[#1D1D1F] truncate">Category: {category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-[12px] text-[#1D1D1F]">{created}</div>
                  <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5E5E7] text-[#1D1D1F]/60 cursor-not-allowed">
                    <Eye size={14} />
                    <span className="hidden md:inline text-[13px]">Details</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
