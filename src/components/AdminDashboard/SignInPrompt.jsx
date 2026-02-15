import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import { Lock, LogIn } from 'lucide-react';

export function SignInPrompt() {
  const cb = encodeURIComponent('/admin/dashboard');

  return (
    <div className="min-h-screen bg-[#F5F5F7] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7b5aff]/5 rounded-full blur-[100px] pointer-events-none" />
      <Header />
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur rounded-3xl border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-[#0A84FF]/10 text-[#0A84FF] flex items-center justify-center">
            <Lock size={22} />
          </div>
          <h1 className="text-[24px] font-semibold text-[#1D1D1F] mb-2">Admin access required</h1>
          <p className="text-[#1D1D1F] mb-6">Please sign in to view the dashboard.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`/account/signin?callbackUrl=${cb}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] font-semibold shadow-lg shadow-[#8A2BE2]/25 hover:shadow-xl"
            >
              <LogIn size={18} /> Sign in
            </a>
            <a
              href={`/account/signup?callbackUrl=${cb}`}
              className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
