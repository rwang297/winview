import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
// Add colorful iOS-style icons
import { Briefcase, Home, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      {/* make wrapper relative so background can sit behind header */}
      {/* Background Image (extends under header) */}
      <div className="absolute inset-0 z-0 opacity-50">
        <img
          src="https://raw.createusercontent.com/e4c7154d-a7bb-4f7a-9126-0a9ba6fa1e50/"
          alt="Background"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#7b5aff]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5ecbf7]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />

      {/* Hero / Intro */}
      <section className="relative z-10 pt-32 pb-14 px-6 overflow-hidden">
        {/* raised above bg */}
        {/* Ambient gradient blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-[#8A2BE2]/25 to-cyan-300/25 rounded-full blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#007AFF]/20 to-[#5AC8FA]/20 rounded-full blur-[100px]" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center max-w-[820px] mx-auto">
            <span className="inline-flex items-center gap-2 pl-2 pr-3 py-1 bg-white/70 backdrop-blur-md border border-white/50 rounded-full text-[12px] text-[#1D1D1F] mb-5">
              <span className="bg-[#8A2BE2] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                About
              </span>
              Our vision at Winview Microfinance Bank
            </span>

            <h1
              className="text-[44px] md:text-[56px] font-semibold leading-[1.05] tracking-tight text-[#1D1D1F] mb-4"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              }}
            >
              Empowering everyday growth with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] via-[#7d7eff] to-cyan-400">
                smart, human banking
              </span>
            </h1>

            <p className="text-[18px] md:text-[20px] leading-[1.6] text-[#6E6E73] max-w-[700px] mx-auto">
              We exist to support small and medium-scale enterprises, help people pay rent with
              dignity, and fund moderate projects so individuals can build with ease. We believe
              finance should be simple, fair, and truly helpful.
            </p>
          </div>

          {/* Banner image using user's gradient */}
          <div className="mt-10 rounded-[32px] overflow-hidden border border-white/50 bg-white/60 backdrop-blur-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)]">
            <img
              src="https://raw.createusercontent.com/b71c8242-9994-4acf-a636-5e41a30ec241/"
              alt="Modern banking and digital finance services"
              className="w-full h-[220px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision pillars */}
      <section className="relative z-10 px-6 pb-20">
        {/* raised above bg */}
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SMEs Support */}
          <div className="p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#E5E5E7] hover:shadow-xl transition-all">
            {/* Colorful iOS-style icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8A2BE2] to-cyan-400 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/30 mb-4">
              <Briefcase size={22} className="text-white" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-2">Fuel for SMEs</h3>
            <p className="text-[15px] text-[#6E6E73]">
              Flexible micro-loans and growth accounts tailored for small and medium businesses.
              From inventory to marketing, we help you move faster.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl">
              {/* Updated, vibrant image */}
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
                alt="Small business team planning"
                className="w-full h-36 object-cover"
              />
            </div>
          </div>

          {/* Rent Assist */}
          <div className="p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#E5E5E7] hover:shadow-xl transition-all">
            {/* Colorful iOS-style icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD166] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/30 mb-4">
              <Home size={22} className="text-white" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-2">Rent Assist</h3>
            <p className="text-[15px] text-[#6E6E73]">
              We offer structured rent support so you can live comfortably and pay over
              time—transparent fees, zero stress.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl">
              {/* Updated, vibrant image */}
              <img
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"
                alt="Comfortable home interior"
                className="w-full h-36 object-cover"
              />
            </div>
          </div>

          {/* Moderate Projects */}
          <div className="p-7 rounded-[28px] bg-white/80 backdrop-blur-xl border border-[#E5E5E7] hover:shadow-xl transition-all">
            {/* Colorful iOS-style icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/30 mb-4">
              <Rocket size={22} className="text-white" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-2">Project Support</h3>
            <p className="text-[15px] text-[#6E6E73]">
              From personal improvements to community-focused ideas, we help fund practical,
              moderate projects with simple repayment plans.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl">
              {/* Updated, vibrant image */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
                alt="People collaborating on a project"
                className="w-full h-36 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 px-6 pb-24">
        {/* raised above bg */}
        <div className="max-w-[900px] mx-auto text-center bg-[#0B0B0C] rounded-[36px] p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#8A2BE2]/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-cyan-400/30 blur-3xl rounded-full" />

          <h2
            className="text-white text-[36px] md:text-[44px] font-semibold mb-3"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            }}
          >
            Together, we make progress possible
          </h2>
          <p className="text-white/70 text-[17px] max-w-[640px] mx-auto mb-8">
            Open an account in minutes and get access to tools that help you build, live, and
            grow—on your terms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/open-account"
              className="px-8 py-4 rounded-full text-white font-semibold text-[16px] bg-gradient-to-r from-[#8A2BE2] via-[#7d7eff] to-cyan-400 hover:opacity-95 transition-all shadow-lg"
            >
              Open Account
            </a>
            <a
              href="/complaints"
              className="px-8 py-4 rounded-full text-white/90 font-semibold text-[16px] bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all"
            >
              Talk to Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
