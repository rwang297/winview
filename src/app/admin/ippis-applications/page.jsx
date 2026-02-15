'use client';

import { AccessDenied } from '@/components/AdminIppis/AccessDenied';
import { ApplicationsContent } from '@/components/AdminIppis/ApplicationsContent';
import { ColumnPicker } from '@/components/AdminIppis/ColumnPicker';
import { FiltersRow } from '@/components/AdminIppis/FiltersRow';
import { LoadingState } from '@/components/AdminIppis/LoadingState';
import { PageHeader } from '@/components/AdminIppis/PageHeader';
import { SearchBar } from '@/components/AdminIppis/SearchBar';
import { SignInPrompt } from '@/components/AdminIppis/SignInPrompt';
import { SortingControls } from '@/components/AdminIppis/SortingControls';
import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { useFilterOptions } from '@/hooks/useFilterOptions';
import { useIppisApplications } from '@/hooks/useIppisApplications';
import { exportIppisApplicationsCsv } from '@/utils/exportIppisApplicationsCsv';
import { printIppisApplication } from '@/utils/printIppisApplication';
import useUser from '@/utils/useUser';
import { useEffect, useState } from 'react';

export default function AdminIppisApplicationsPage() {
  const [search, setSearch] = useState('');
  const [rank, setRank] = useState('');
  const [payPoint, setPayPoint] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [hasPoliceId, setHasPoliceId] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [visibleCols, setVisibleCols] = useState({
    ippis: true,
    payPoint: true,
    automobile: true,
    monthlyRepayment: true,
  });

  const { data: user, loading: userLoading } = useUser();
  const { isAdmin, meLoading } = useAdminCheck(user);

  useEffect(() => {
    if (user && !isAdmin) {
      const t = setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        }
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [user, isAdmin]);

  const filters = {
    search,
    rank,
    payPoint,
    stateFilter,
    hasPoliceId,
    sortBy,
    sortDir,
  };

  const { applications, isLoading, isError, error, refetch } = useIppisApplications(
    user,
    isAdmin,
    filters
  );

  const { ranks, payPoints, states } = useFilterOptions(applications);

  const handleExportCsv = () => {
    exportIppisApplicationsCsv(applications);
  };

  const toggleCol = (key) => {
    setVisibleCols((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = (record) => {
    printIppisApplication(record);
  };

  if (userLoading || meLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return <SignInPrompt />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden text-[#1D1D1F]">
      <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8A2BE2]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00BFFF]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <PageHeader onRefresh={refetch} onExport={handleExportCsv} />

          <div className="mb-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-3">
            <SearchBar value={search} onChange={setSearch} />
            <FiltersRow
              rank={rank}
              setRank={setRank}
              payPoint={payPoint}
              setPayPoint={setPayPoint}
              stateFilter={stateFilter}
              setStateFilter={setStateFilter}
              hasPoliceId={hasPoliceId}
              setHasPoliceId={setHasPoliceId}
              ranks={ranks}
              payPoints={payPoints}
              states={states}
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <SortingControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortDir={sortDir}
              setSortDir={setSortDir}
            />
            <ColumnPicker visibleCols={visibleCols} toggleCol={toggleCol} />
          </div>

          <ApplicationsContent
            isLoading={isLoading}
            isError={isError}
            error={error}
            applications={applications}
            visibleCols={visibleCols}
            onPrint={handlePrint}
          />
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
