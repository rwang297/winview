export function GenderDistribution({ metrics, winviewGradient }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm">
      <h2 className="text-[24px] font-semibold text-[#1D1D1F] mb-8 tracking-tight">
        Gender Distribution
      </h2>
      <div className="space-y-6">
        {metrics?.demographics?.byGender?.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-[17px] text-[#1D1D1F] capitalize font-medium w-24">
              {item.gender}
            </span>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <div className="w-full max-w-[200px] h-3 bg-[#F5F5F7] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${winviewGradient} rounded-full`}
                  style={{
                    width: `${(Number.parseInt(item.count) / metrics.totalAccounts) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[17px] font-semibold text-[#1D1D1F] w-12 text-right">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
