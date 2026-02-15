'use client';

import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import {
  ArrowRight,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Vault,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SavingsPage() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const winviewGradient = 'from-[#8A2BE2] to-[#00BFFF]';

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.createusercontent.com/d1471408-cb86-4545-b8b5-1cd372e9c019/"
          alt="Savings Growth Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2]/90 to-[#FAF7F2]/70" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-[-30%] right-[-10%] w-[800px] h-[800px] bg-[#8A2BE2]/15 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#00BFFF]/15 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <Header />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div
          className={`max-w-[1100px] mx-auto transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Enhanced Hero */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#8A2BE2] to-[#00BFFF] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#8A2BE2]/30">
              <PiggyBank size={42} className="text-white" strokeWidth={2} />
            </div>
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-white/60 shadow-sm mb-6`}
            >
              <Sparkles size={18} className="text-[#8A2BE2]" />
              <span className="text-sm font-medium text-[#1D1D1F]">Savings Plans</span>
            </div>
            <h1 className="text-[44px] md:text-[56px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.05]">
              Grow your savings the iPhone way
            </h1>
            <p className="text-[18px] text-[#86868b] max-w-2xl mx-auto mt-4">
              Clean, simple, and smart. Pick a plan, set your goal, and let Winview do the rest with
              premium interest rates.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#plans"
                className={`px-8 py-4 rounded-full text-white bg-gradient-to-r ${winviewGradient} font-medium shadow-lg shadow-[#8A2BE2]/25 hover:scale-105 transition-all duration-300 active:scale-95`}
              >
                Explore Plans
              </a>
              <a
                href="/open-account"
                className="px-8 py-4 rounded-full bg-white text-[#1D1D1F] border border-[#E5E5E7] font-medium hover:bg-[#F5F5F7] transition-all"
              >
                Open Account
              </a>
            </div>
          </div>

          {/* Smart Savings Packages - Moved here for better flow */}
          <section id="plans" className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Daily Saver',
                rate: '10% p.a.',
                desc: 'Flexible deposits with instant access to your funds.',
                icon: TrendingUp,
                iconBg: 'from-[#34C759] to-[#30D158]',
                color: '#34C759',
              },
              {
                title: 'Target Goal',
                rate: '12% p.a.',
                desc: 'Lock-in savings toward a specific financial goal.',
                icon: Target,
                iconBg: 'from-[#FF9500] to-[#FF9F0A]',
                color: '#FF9500',
              },
              {
                title: 'Safe Vault',
                rate: '14% p.a.',
                desc: 'Longer term commitment for maximum returns.',
                icon: Vault,
                iconBg: 'from-[#8A2BE2] to-[#AF52DE]',
                color: '#8A2BE2',
              },
            ].map((p, i) => (
              <div
                key={p.title}
                className="group bg-white/95 backdrop-blur-sm rounded-[28px] p-6 border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.12)] transition-all"
                style={{
                  animation: `fadeInUp 0.6s ease ${0.1 * i + 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${p.iconBg} rounded-3xl flex items-center justify-center shadow-lg`}
                  >
                    <p.icon size={28} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={14} className="text-[#FF9500] fill-current" />
                      <Star size={14} className="text-[#FF9500] fill-current" />
                      <Star size={14} className="text-[#FF9500] fill-current" />
                      <Star size={14} className="text-[#FF9500] fill-current" />
                      <Star size={14} className="text-[#FF9500] fill-current" />
                    </div>
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color: p.color,
                        backgroundColor: `${p.color}15`,
                      }}
                    >
                      {p.rate}
                    </span>
                  </div>
                </div>
                <h3 className="text-[22px] font-semibold text-[#1D1D1F] mb-3">{p.title}</h3>
                <p className="text-[15px] text-[#86868b] mb-6 leading-relaxed">{p.desc}</p>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
                    <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full"></div>
                    <span>FDIC Insured</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
                    <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full"></div>
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
                    <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full"></div>
                    <span>Mobile app access</span>
                  </div>
                </div>

                <a
                  href="/open-account"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white bg-gradient-to-r ${winviewGradient} font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-lg`}
                >
                  Start with this plan
                  <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </section>

          {/* Enhanced Benefits Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 rounded-[28px] p-8 border border-white/60 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-[#34C759] to-[#30D158] rounded-3xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-4">Bank-Grade Security</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                Your money is protected with 256-bit encryption, biometric authentication, and FDIC
                insurance up to $250,000.
              </p>
            </div>

            <div className="bg-white/90 rounded-[28px] p-8 border border-white/60 shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF] to-[#0099CC] rounded-3xl flex items-center justify-center mb-6">
                <TrendingUp size={28} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-4">Smart Growth</h3>
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                Watch your savings grow with competitive interest rates and intelligent auto-save
                features powered by AI.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
