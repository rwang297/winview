import { Eye, Hash, Mail, Phone, Printer } from 'lucide-react';
import { ApplicationDetails } from './ApplicationDetails';

export function ApplicationRow({ application, visibleCols, onPrint }) {
  const name =
    application.applicant_full_name ||
    [application.surname, application.first_name, application.middle_name]
      .filter(Boolean)
      .join(' ');
  const email = application.personal_email;
  const created = application.created_at ? new Date(application.created_at).toLocaleString() : '';

  return (
    <div
      className={`grid md:grid-cols-[90px_1.5fr_${visibleCols.ippis ? '1fr' : '0px'}_${visibleCols.payPoint ? '1fr' : '0px'}_${visibleCols.automobile ? '1fr' : '0px'}_${visibleCols.monthlyRepayment ? '1fr' : '0px'}_160px] grid-cols-1 px-6 py-4 gap-3 items-center`}
    >
      {/* ID + created */}
      <div className="flex items-center gap-2 text-[#1D1D1F]">
        <div className="w-7 h-7 rounded-lg bg-[#F5F5F7] flex items-center justify-center">
          {/* DARKEN icon */}
          <Hash size={14} className="text-[#1D1D1F]" />
        </div>
        <div className="leading-tight">
          <div className="text-[14px] font-semibold">{application.id}</div>
          {/* DARKEN timestamp */}
          <div className="text-[12px] text-[#1D1D1F]">{created}</div>
        </div>
      </div>

      {/* Applicant */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center font-bold">
          {String(name || '?')
            .charAt(0)
            .toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-[#1D1D1F] truncate">{name || '—'}</div>
          {/* DARKEN rank */}
          <div className="text-[12px] text-[#1D1D1F] truncate">{application.rank || ''}</div>
        </div>
      </div>

      {visibleCols.ippis ? (
        <div className="text-[14px] text-[#1D1D1F]">{application.ippis_number || '—'}</div>
      ) : null}
      {visibleCols.payPoint ? (
        <div className="text-[14px] text-[#1D1D1F]">{application.pay_point || '—'}</div>
      ) : null}
      {visibleCols.automobile ? (
        <div className="text-[14px] text-[#1D1D1F]">{application.automobile_type || '—'}</div>
      ) : null}
      {visibleCols.monthlyRepayment ? (
        <div className="text-[14px] text-[#1D1D1F]">{application.monthly_repayment ?? '—'}</div>
      ) : null}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {email ? (
          <a
            href={`mailto:${email}`}
            className="px-3 py-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EDEDEF] text-[#1D1D1F] flex items-center gap-1"
            title="Email"
          >
            <Mail size={14} />
            <span className="hidden lg:inline text-[13px]">Email</span>
          </a>
        ) : null}
        {application.telephone_a ? (
          <a
            href={`tel:${application.telephone_a}`}
            className="px-3 py-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EDEDEF] text-[#1D1D1F] flex items-center gap-1"
            title="Call"
          >
            <Phone size={14} />
            <span className="hidden lg:inline text-[13px]">Call</span>
          </a>
        ) : null}
        <button
          onClick={() => onPrint(application)}
          className="px-3 py-2 rounded-xl bg-white border border-[#E5E5E7] hover:bg-[#F5F5F7] text-[#1D1D1F] flex items-center gap-1"
          title="Print"
        >
          <Printer size={14} />
          <span className="hidden lg:inline text-[13px]">Print</span>
        </button>
        <details className="group">
          <summary className="list-none px-3 py-2 rounded-xl bg-[#0A84FF] text-white flex items-center gap-1 cursor-pointer">
            <Eye size={14} />
            <span className="hidden lg:inline text-[13px]">Details</span>
          </summary>
          <ApplicationDetails application={application} />
        </details>
      </div>
    </div>
  );
}
