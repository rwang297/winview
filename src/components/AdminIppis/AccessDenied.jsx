import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      <Header />
      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-xl shadow-lg">
          Access denied — redirecting to Home…
        </div>
      </main>
      <Footer />
    </div>
  );
}
