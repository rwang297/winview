import { Download, RefreshCw } from 'lucide-react';

export function PageHeader({ onRefresh, onExport }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 className="text-[36px] md:text-[48px] font-semibold text-[#1D1D1F] tracking-tight">
          IPPIS{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF]">
            Applications
          </span>
        </h1>
        <p className="text-[#86868b] text-[16px] mt-2">
          Review recent IPPIS-linked applications. Search, filter, sort, export.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E5E7] hover:bg-[#F5F5F7] text-[#1D1D1F]"
          title="Refresh"
        >
          <RefreshCw size={16} /> Refresh
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] text-white shadow-lg shadow-[#8A2BE2]/25 hover:shadow-xl"
          title="Export CSV"
        >
          <Download size={16} /> Export
        </button>
      </div>
    </div>
  );
}
