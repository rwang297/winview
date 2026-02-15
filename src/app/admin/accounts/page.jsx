'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export default function AdminAccountsPage() {
  const limit = 10; // fixed as requested
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['accounts', page, limit],
    queryFn: async () => {
      const res = await fetch(`/api/accounts?limit=${limit}&page=${page}`);
      if (!res.ok) {
        throw new Error(
          `When fetching /api/accounts, the response was [${res.status}] ${res.statusText}`
        );
      }
      return res.json();
    },
    keepPreviousData: true,
  });

  const accounts = data?.accounts || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-semibold text-[#1D1D1F] tracking-tight">All Accounts</h1>
        <div className="text-sm text-[#1D1D1F]/70">{total.toLocaleString()} total</div>
      </div>

      <div className="bg-white rounded-[24px] p-6 border border-[#E5E5E7] shadow-sm">
        {isLoading ? (
          <div className="text-[#1D1D1F]">Loading accounts…</div>
        ) : error ? (
          <div className="text-[#FF3B30]">Failed to load accounts. Please try again.</div>
        ) : accounts.length === 0 ? (
          <div className="text-[#1D1D1F]">No accounts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-[#86868b]">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Phone</th>
                  <th className="py-3 pr-4">Occupation</th>
                  <th className="py-3 pr-4">Gender</th>
                  <th className="py-3 pr-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.id} className="border-t border-[#E5E5E7] text-[14px]">
                    <td className="py-3 pr-4 font-semibold text-[#1D1D1F] whitespace-nowrap">
                      {a.full_name || '—'}
                    </td>
                    <td className="py-3 pr-4 text-[#1D1D1F] whitespace-nowrap">{a.email || '—'}</td>
                    <td className="py-3 pr-4 text-[#1D1D1F] whitespace-nowrap">{a.phone || '—'}</td>
                    <td className="py-3 pr-4 text-[#1D1D1F] whitespace-nowrap">
                      {a.occupation || '—'}
                    </td>
                    <td className="py-3 pr-4 text-[#1D1D1F] whitespace-nowrap">
                      {a.gender || '—'}
                    </td>
                    <td className="py-3 pr-4 text-[#1D1D1F] whitespace-nowrap">
                      {a.created_at ? new Date(a.created_at).toLocaleString() : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-xl border transition-colors ${
                isActive
                  ? 'bg-[#0A84FF] text-white border-[#0A84FF]'
                  : 'bg-white text-[#1D1D1F] border-[#E5E5E7] hover:bg-gray-50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Mobile-friendly note */}
      <p className="mt-4 text-center text-xs text-[#86868b]">
        Showing {limit} accounts per page. Use the page numbers below to navigate.
      </p>
    </div>
  );
}
