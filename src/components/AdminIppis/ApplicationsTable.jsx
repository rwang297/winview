import { ApplicationRow } from './ApplicationRow';

export function ApplicationsTable({ applications, visibleCols, onPrint }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl border border-white/60 overflow-hidden">
      <div
        className={`hidden md:grid grid-cols-[90px_1.5fr_${visibleCols.ippis ? '1fr' : '0px'}_${visibleCols.payPoint ? '1fr' : '0px'}_${visibleCols.automobile ? '1fr' : '0px'}_${visibleCols.monthlyRepayment ? '1fr' : '0px'}_160px] gap-4 px-6 py-4 text-[12px] font-semibold text-[#1D1D1F] uppercase tracking-widest`}
      >
        <div>ID</div>
        <div>Applicant</div>
        {visibleCols.ippis ? <div>IPPIS</div> : null}
        {visibleCols.payPoint ? <div>Pay Point</div> : null}
        {visibleCols.automobile ? <div>Automobile</div> : null}
        {visibleCols.monthlyRepayment ? <div>Monthly Repay.</div> : null}
        <div>Actions</div>
      </div>
      <div className="divide-y divide-[#E5E5E7]">
        {applications.map((a) => (
          <ApplicationRow key={a.id} application={a} visibleCols={visibleCols} onPrint={onPrint} />
        ))}
      </div>
    </div>
  );
}
