import { User } from 'lucide-react';

export function PageHeader({ isVisible, winviewGradient }) {
  return (
    <div
      className={`text-center mb-12 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-[#7b5aff] to-[#5ecbf7] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#7b5aff]/30">
        <User size={36} className="text-white" strokeWidth={2} />
      </div>
      <h1 className="text-[48px] md:text-[56px] font-semibold text-[#1D1D1F] mb-4 tracking-tight leading-[1.1]">
        Open Your <br />
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${winviewGradient}`}>
          Account
        </span>
      </h1>
      <p className="text-[19px] text-[#86868b]">
        Join thousands of satisfied customers with Winview's premium banking experience
      </p>
    </div>
  );
}
