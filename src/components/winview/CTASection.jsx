import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 px-6 bg-[#FFFBF5] overflow-hidden relative">
      <div className="w-full mx-auto">
        <div className="relative bg-[#1D1D1F] rounded-[48px] p-12 md:p-24 text-center overflow-hidden shadow-2xl group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out">
            <img
              src="https://raw.createusercontent.com/e1f68ec1-ab49-4256-8edd-5cba4cf03f5c/"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/80 to-transparent" />
          </div>

          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#007AFF]/30 to-purple-500/30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-overlay" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-orange-500/20 to-yellow-500/20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2 mix-blend-overlay" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[48px] md:text-[64px] font-semibold text-white mb-8 tracking-tight leading-[1.05]">
              Ready to start?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join thousands of users who have already upgraded their financial life with Winview
              Microfinance.
            </p>

            <a
              href="/open-account"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-full text-[19px] font-semibold hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/5"
            >
              <span>Open Your Account</span>
              <ArrowRight size={20} />
            </a>

            <p className="mt-8 text-sm text-gray-500">
              No credit check required. Setup in 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
