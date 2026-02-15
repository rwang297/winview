'use client';

import { AccessDenied } from '@/components/AdminDashboard/AccessDenied';
import { AdminAccessManager } from '@/components/AdminDashboard/AdminAccessManager';
import { GenderDistribution } from '@/components/AdminDashboard/GenderDistribution';
import { IppisInsights } from '@/components/AdminDashboard/IppisInsights';
import { KeyMetrics } from '@/components/AdminDashboard/KeyMetrics';
import { LatestAccountOpenings } from '@/components/AdminDashboard/LatestAccountOpenings';
import { LatestComplaints } from '@/components/AdminDashboard/LatestComplaints';
import { LatestIppisApplications } from '@/components/AdminDashboard/LatestIppisApplications';
import { LoadingState } from '@/components/AdminDashboard/LoadingState';
import { MonthlyTrends } from '@/components/AdminDashboard/MonthlyTrends';
import { SignInPrompt } from '@/components/AdminDashboard/SignInPrompt';
import { TopOccupations } from '@/components/AdminDashboard/TopOccupations';
import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { useAdminAllowlist } from '@/hooks/useAdminAllowlist';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { useLatestAccounts, useLatestComplaints, useLatestIppis } from '@/hooks/useLatestData';
import { formatCurrency } from '@/utils/formatCurrency';
import useUser from '@/utils/useUser';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { data: user, loading: userLoading } = useUser();

  const winviewGradient = 'from-[#7b5aff] to-[#5ecbf7]';

  const {
    data: me,
    isLoading: meLoading,
    isError: meError,
  } = useQuery({
    queryKey: ['admin-me'],
    enabled: !!user,
    queryFn: async () => {
      const res = await fetch('/api/admin/allowlist?me=1');
      if (!res.ok) {
        if (res.status === 401) return { isAdmin: false };
        throw new Error(`Failed admin check: [${res.status}] ${res.statusText}`);
      }
      return res.json();
    },
  });

  const isAdmin = !!me?.isAdmin;

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

  const { metrics, trends, loading } = useAdminDashboard(user, isAdmin);
  const { allowlistData, allowlistLoading, addAdmin, removeAdmin } = useAdminAllowlist(
    user,
    isAdmin
  );
  const { data: latestIppisData, isLoading: latestIppisLoading } = useLatestIppis(user, isAdmin);
  const {
    data: accountsData,
    isLoading: accountsLoading,
    isError: accountsError,
  } = useLatestAccounts(user, isAdmin);
  // NEW: latest complaints
  const {
    data: complaintsData,
    isLoading: complaintsLoading,
    isError: complaintsError,
  } = useLatestComplaints(user, isAdmin);

  if (userLoading || meLoading) {
    return <LoadingState message="Checking access…" />;
  }

  if (!user) {
    return <SignInPrompt />;
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  const admins = allowlistData?.admins || [];
  const latestIppis = latestIppisData?.applications || [];
  const latestAccounts = (accountsData?.accounts || []).slice(0, 5);
  const latestComplaints = complaintsData?.complaints || [];

  return (
    // Make all text highly readable by default (both light and dark use the same high-contrast color)
    <div className="min-h-screen bg-[#FFF7ED] dark:bg-[#FFF7ED] relative overflow-hidden text-[#0B0B0E]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/20 dark:bg-[#f59e0b]/20 rounded-full blur-[100px] pointer-events-none" />

      <Header />
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            {/* Force strong contrast for heading regardless of dark mode */}
            <h1 className="text-[40px] md:text-[56px] font-semibold text-[#0B0B0E] mb-3 tracking-tight">
              Admin{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${winviewGradient}`}>
                Dashboard
              </span>
            </h1>
            {/* Use a darker neutral for descriptions for clarity on the warm background */}
            <p className="text-[19px] text-[#1F2937]">
              Monitor account creation and customer support metrics
            </p>
          </div>

          <KeyMetrics metrics={metrics} winviewGradient={winviewGradient} />

          <IppisInsights
            metrics={metrics}
            winviewGradient={winviewGradient}
            formatCurrency={formatCurrency}
          />

          <LatestIppisApplications
            latestIppis={latestIppis}
            latestIppisLoading={latestIppisLoading}
          />

          <LatestAccountOpenings
            latestAccounts={latestAccounts}
            accountsLoading={accountsLoading}
            accountsError={accountsError}
          />

          {/* NEW: Latest complaints block */}
          <LatestComplaints
            complaints={latestComplaints}
            loading={complaintsLoading}
            error={complaintsError}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <GenderDistribution metrics={metrics} winviewGradient={winviewGradient} />
            <AdminAccessManager
              admins={admins}
              allowlistLoading={allowlistLoading}
              addAdmin={addAdmin}
              removeAdmin={removeAdmin}
            />
          </div>

          <TopOccupations metrics={metrics} />

          <MonthlyTrends trends={trends} winviewGradient={winviewGradient} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
