import { Calendar } from 'lucide-react';

export function MonthlyTrends({ trends, winviewGradient }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${winviewGradient} rounded-xl flex items-center justify-center shadow-lg shadow-[#7b5aff]/20`}
        >
          <Calendar size={24} className="text-white" />
        </div>
        <h2 className="text-[28px] font-semibold text-[#1D1D1F] tracking-tight">
          Monthly Account Creation
        </h2>
      </div>
      <div className="space-y-4">
        {trends?.map((item, index) => (
          <div key={index} className="flex items-center gap-6">
            <span className="text-[17px] text-[#1D1D1F] w-24 font-medium">{item.month}</span>
            <div className="flex-1 h-10 bg-[#F5F5F7] rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${winviewGradient} rounded-full flex items-center justify-end pr-4 transition-all duration-1000 ease-out`}
                style={{
                  width: `${Math.max((Number.parseInt(item.count) / Math.max(...trends.map((t) => Number.parseInt(t.count)))) * 100, 10)}%`,
                }}
              >
                <span className="text-[15px] font-bold text-white">{item.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
