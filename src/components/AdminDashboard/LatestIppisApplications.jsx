import { Eye } from 'lucide-react';

export function LatestIppisApplications({ latestIppis, latestIppisLoading }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight">
          Latest IPPIS Applications
        </h2>
        <a href="/admin/ippis-applications" className="text-[#0A84FF] hover:underline text-[14px]">
          View all
        </a>
      </div>
      {latestIppisLoading ? (
        <div className="text-[#1D1D1F]">Loading latest…</div>
      ) : latestIppis.length === 0 ? (
        <div className="text-[#1D1D1F]">No recent applications.</div>
      ) : (
        <div className="divide-y divide-[#E5E5E7]">
          {latestIppis.map((a) => {
            const name =
              a.applicant_full_name ||
              [a.surname, a.first_name, a.middle_name].filter(Boolean).join(' ');
            const created = a.created_at ? new Date(a.created_at).toLocaleString() : '';
            return (
              <div key={a.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center font-bold">
                    {String(name || '?')
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-[#1D1D1F] truncate">
                      {name || '—'}
                    </div>
                    <div className="text-[12px] text-[#1D1D1F] truncate">
                      {a.rank || ''} • {a.pay_point || '—'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-[12px] text-[#1D1D1F]">{created}</div>
                  <a
                    href="/admin/ippis-applications"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  >
                    <Eye size={14} />
                    <span className="hidden md:inline text-[13px]">Details</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
