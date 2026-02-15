import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';

export function LatestAccountOpenings({ latestAccounts, accountsLoading, accountsError }) {
  const [selectedId, setSelectedId] = useState('');

  const options = useMemo(() => {
    return (latestAccounts || []).map((a) => {
      const meta = [a.occupation, a.gender].filter(Boolean).join(' • ');
      const created = a.created_at ? new Date(a.created_at).toLocaleString() : '';
      return {
        id: String(a.id),
        label: `${a.full_name || '—'} ${meta ? '• ' + meta : ''}`.trim(),
        sub: created,
      };
    });
  }, [latestAccounts]);

  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-semibold text-[#1D1D1F] tracking-tight">
          Latest Account Openings
        </h2>
        <a href="/admin/accounts" className="text-[#0A84FF] hover:underline text-[14px]">
          View all
        </a>
      </div>
      {accountsLoading ? (
        <div className="text-[#1D1D1F]">Loading latest…</div>
      ) : accountsError ? (
        <div className="text-[#FF3B30]">Failed to load accounts.</div>
      ) : (latestAccounts || []).length === 0 ? (
        <div className="text-[#1D1D1F]">No recent accounts.</div>
      ) : (
        <div className="space-y-4">
          {/* Dropdown (dropbox) listing latest accounts */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1D1D1F]">Select recent account</label>
            <select
              className="w-full px-4 py-3 rounded-2xl border border-[#E5E5E7] bg-white text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/20"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" disabled>
                Choose an account
              </option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            {selectedId && (
              <div className="text-[13px] text-[#1D1D1F]">
                {options.find((o) => o.id === selectedId)?.sub}
              </div>
            )}
          </div>

          {/* Disabled inline Details control to keep parity with old UI */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[12px] text-[#1D1D1F]/60">
              Showing latest {Math.min(5, options.length)} in dropdown
            </div>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5E5E7] text-[#1D1D1F]/60 cursor-not-allowed">
              <Eye size={14} />
              <span className="hidden md:inline text-[13px]">Details</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
