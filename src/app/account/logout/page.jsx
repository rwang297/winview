'use client';

import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import useAuth from '@/utils/useAuth';

export default function LogoutPage() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/', redirect: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8A2BE2]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00BFFF]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />
      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur rounded-3xl border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-8 text-center">
          <h1 className="text-[28px] font-semibold text-[#1D1D1F] mb-4">Sign out</h1>
          <p className="text-[#6E6E73] mb-6">You can sign back in anytime.</p>
          <button
            onClick={handleSignOut}
            className="w-full px-5 py-3 rounded-xl text-white bg-gradient-to-r from-[#8A2BE2] to-[#00BFFF] font-semibold shadow-lg shadow-[#8A2BE2]/25 hover:shadow-xl transition-all"
          >
            Sign out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
