import { Columns as ColumnsIcon } from 'lucide-react';

export function ColumnPicker({ visibleCols, toggleCol }) {
  return (
    <div className="flex items-center gap-3 bg-white/90 rounded-2xl border border-white/60 shadow-sm px-3 py-2">
      <ColumnsIcon size={16} className="text-[#6E6E73]" />
      <label className="flex items-center gap-2 text-[13px]">
        <input type="checkbox" checked={visibleCols.ippis} onChange={() => toggleCol('ippis')} />{' '}
        IPPIS
      </label>
      <label className="flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          checked={visibleCols.payPoint}
          onChange={() => toggleCol('payPoint')}
        />{' '}
        Pay Point
      </label>
      <label className="flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          checked={visibleCols.automobile}
          onChange={() => toggleCol('automobile')}
        />{' '}
        Automobile
      </label>
      <label className="flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          checked={visibleCols.monthlyRepayment}
          onChange={() => toggleCol('monthlyRepayment')}
        />{' '}
        Monthly Rep.
      </label>
    </div>
  );
}
