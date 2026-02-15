import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { Check, Heart } from 'lucide-react';

export function SuccessScreen({ email, winviewGradient }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.createusercontent.com/c73162ba-b38e-46de-8a61-78248ef56264/"
          alt="Banking Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2]/90 to-[#FAF7F2]/70" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#7b5aff]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#5ecbf7]/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <Header />
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-[600px] mx-auto text-center">
          <div
            className={`w-32 h-32 bg-gradient-to-br ${winviewGradient} rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#7b5aff]/30 animate-in zoom-in-50 duration-500`}
          >
            <Check size={60} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-[48px] font-semibold text-[#1D1D1F] mb-4 tracking-tight animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200">
            Account Created! 🎉
          </h1>
          <p className="text-[19px] text-[#86868b] mb-10 max-w-md mx-auto animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
            Welcome to Winview! We've sent a confirmation email to{' '}
            <strong className="text-[#1D1D1F]">{email}</strong> with your next steps.
          </p>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/60 shadow-lg animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-350">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-2xl flex items-center justify-center">
                <Heart size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-[17px] font-semibold text-[#1D1D1F]">What's Next?</h3>
                <p className="text-[15px] text-[#86868b]">
                  Check your email for account verification and setup instructions
                </p>
              </div>
            </div>
          </div>
          <a
            href="/"
            className={`inline-block px-10 py-4 bg-gradient-to-r ${winviewGradient} text-white rounded-full text-[17px] font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-[#7b5aff]/30 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-400 will-change-transform`}
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
