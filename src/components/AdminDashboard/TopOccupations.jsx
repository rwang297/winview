export function TopOccupations({ metrics }) {
  return (
    <div className="bg-white rounded-[32px] p-10 border border-[#E5E5E7] shadow-sm mb-12">
      <h2 className="text-[24px] font-semibold text-[#1D1D1F] mb-8 tracking-tight">
        Top Occupations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics?.demographics?.byOccupation?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 bg-[#F5F5F7]/50 border border-[#E5E5E7] rounded-2xl hover:bg-white hover:shadow-md transition-all"
          >
            <span className="text-[17px] text-[#1D1D1F] font-medium">{item.occupation}</span>
            <span className="text-[19px] font-bold text-[#7b5aff]">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
