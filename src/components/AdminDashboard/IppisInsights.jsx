import { ShieldCheck, TrendingUp } from 'lucide-react';
import { BarRow } from './BarRow';
import { MetricCard } from './MetricCard';

export function IppisInsights({ metrics, winviewGradient, formatCurrency }) {
  const ippis = metrics?.ippis || {};
  const autoDist = ippis?.automobile || [];
  const topPayPoints = ippis?.topPayPoints || [];
  const topRanks = ippis?.topRanks || [];

  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm mb-12">
      <h2 className="text-[24px] font-semibold text-[#1D1D1F] mb-8 tracking-tight">
        IPPIS Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <MetricCard
          title="IPPIS This Month"
          value={ippis?.thisMonth || 0}
          icon={<TrendingUp size={28} className="text-white" />}
          gradient={winviewGradient}
        />
        <MetricCard
          title="With Police ID"
          value={ippis?.withPoliceId || 0}
          icon={<ShieldCheck size={28} className="text-white" />}
          gradient={winviewGradient}
        />
        <MetricCard
          title="Avg Repayment"
          value={formatCurrency(ippis?.avgMonthlyRepayment || 0)}
          icon={<TrendingUp size={28} className="text-white" />}
          gradient={winviewGradient}
        />
        <MetricCard
          title="Total Savings"
          value={formatCurrency(ippis?.savings?.total || 0)}
          icon={<TrendingUp size={28} className="text-white" />}
          gradient={winviewGradient}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl p-6">
          <h3 className="text-[18px] font-semibold text-[#1D1D1F] mb-4">Automobile Mix</h3>
          <div className="space-y-4">
            {(autoDist || []).map((it, idx) => (
              <BarRow
                key={idx}
                label={(it.automobile_type || 'unspecified').replace(/_/g, ' ')}
                count={Number.parseInt(it.count)}
                total={Math.max(metrics?.totalIppisApplications || 0, 1)}
                gradient={winviewGradient}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl p-6">
          <h3 className="text-[18px] font-semibold text-[#1D1D1F] mb-4">Top Pay Points</h3>
          <div className="space-y-4">
            {(topPayPoints || []).map((it, idx) => (
              <BarRow
                key={idx}
                label={it.pay_point || '—'}
                count={Number.parseInt(it.count)}
                total={Math.max(metrics?.totalIppisApplications || 0, 1)}
                gradient={winviewGradient}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl p-6 mt-8">
        <h3 className="text-[18px] font-semibold text-[#1D1D1F] mb-4">Top Ranks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(topRanks || []).map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white border border-[#E5E5E7] rounded-xl"
            >
              <span className="text-[15px] text-[#1D1D1F] font-medium">{it.rank || '—'}</span>
              <span className="text-[17px] font-bold text-[#7b5aff]">{it.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
