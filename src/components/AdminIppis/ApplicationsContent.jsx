import { ApplicationsTable } from './ApplicationsTable';

export function ApplicationsContent({
  isLoading,
  isError,
  error,
  applications,
  visibleCols,
  onPrint,
}) {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-3xl border border-white/60 p-10 flex items-center justify-center text-[#1D1D1F]">
        Loading applications...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-3xl border border-white/60 p-10 text-[#FF3B30]">
        {(error && error.message) || 'Could not load applications'}
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur rounded-3xl border border-white/60 p-10 text-center text-[#1D1D1F]">
        No applications found.
      </div>
    );
  }

  return (
    <ApplicationsTable applications={applications} visibleCols={visibleCols} onPrint={onPrint} />
  );
}
