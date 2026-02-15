'use client';

import Footer from '@/components/winview/Footer';
import Header from '@/components/winview/Header';
import {
  ArrowRight,
  Clock,
  DollarSign,
  Heart,
  Landmark,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoansPage() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const winviewGradient = 'from-[#8A2BE2] to-[#00BFFF]';

  return (
    <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden">
      {/* Enhanced Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://raw.createusercontent.com/809b0d63-f136-4302-91c7-b7edb5cbb040/"
          alt="Quick Funding Background"
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
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00BFFF] to-[#0066CC] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#00BFFF]/30">
              <Zap size={42} className="text-white" strokeWidth={2} />
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-white/60 shadow-sm mb-6">
              <Landmark size={18} className="text-[#00BFFF]" />
              <span className="text-sm font-medium text-[#1D1D1F]">Micro Loans</span>
            </div>
            <h1 className="text-[44px] md:text-[56px] font-semibold text-[#1D1D1F] tracking-tight leading-[1.05]">
              Quick funding. Zero friction.
            </h1>
            <p className="text-[18px] text-[#86868b] max-w-2xl mx-auto mt-4">
              Apply in minutes, get a decision fast, and track everything in a clean, iOS-style
              experience built for speed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#offers"
                className={`px-8 py-4 rounded-full text-white bg-gradient-to-r ${winviewGradient} font-medium shadow-lg shadow-[#8A2BE2]/25 hover:scale-105 transition-all duration-300 active:scale-95`}
              >
                View Offers
              </a>
              <a
                href="/open-account"
                className="px-8 py-4 rounded-full bg-white text-[#1D1D1F] border border-[#E5E5E7] font-medium hover:bg-[#F5F5F7] transition-all"
              >
                Open Account
              </a>
            </div>
          </div>

          {/* IPPIS Information Section */}
          <div className="relative mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-white/60 rounded-[24px] p-6 md:p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.12)] transition-shadow">
                {/* soft ambient glows */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-[#0A84FF]/10 rounded-full blur-2xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 bg-[#30D158]/10 rounded-full blur-2xl" />

                <div className="text-center relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-semibold border border-[#FF2D55]/20 mb-4">
                    <Heart size={14} />
                    <span>Because we care</span>
                  </div>
                  <h2 className="text-[20px] md:text-[22px] text-[#1D1D1F] leading-relaxed font-medium">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A84FF] to-[#30D158] font-semibold">
                      We are a microfinance bank
                    </span>{' '}
                    that afford our users the luxury of acquiring loans with ease using their{' '}
                    <span className="inline-block align-middle px-2.5 py-1 rounded-full text-[13px] font-semibold text-[#0A84FF] bg-[#0A84FF]/10 border border-[#0A84FF]/20">
                      IPPIS number
                    </span>{' '}
                    because we care.
                  </h2>
                  <div
                    className="mx-auto mt-5 h-1 w-28 rounded-full"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #0A84FF, #8A2BE2, #30D158, #0A84FF)',
                      backgroundSize: '200% 100%',
                      animation: 'shine 2.4s ease-in-out infinite alternate',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Offers */}
          <section id="offers" className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Instant Cash',
                amount: 'Up to ₦50,000',
                desc: 'Perfect for quick needs. Same-day decision with instant approval.',
                icon: Zap,
                iconBg: 'from-[#FF3B30] to-[#FF6B6B]',
                color: '#FF3B30',
                features: ['Same-day approval', 'No collateral', 'Flexible terms'],
              },
              {
                title: 'Business Boost',
                amount: 'Up to ₦500,000',
                desc: 'Grow inventory or bridge cashflow with competitive rates.',
                icon: TrendingUp,
                iconBg: 'from-[#34C759] to-[#30D158]',
                color: '#34C759',
                features: ['Business growth', 'Low interest', 'Quick disbursement'],
              },
              {
                title: 'Device Finance',
                amount: 'Up to ₦350,000',
                desc: 'Get the tools you need, pay over time with zero stress.',
                icon: Smartphone,
                iconBg: 'from-[#007AFF] to-[#0051D0]',
                color: '#007AFF',
                features: ['0% down payment', '12-month terms', 'Latest devices'],
              },
            ].map((o, i) => (
              <div
                key={o.title}
                className="group bg-white/95 backdrop-blur-sm rounded-[28px] p-6 border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.12)] transition-all"
                style={{
                  animation: `fadeInUp 0.6s ease ${0.1 * i + 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${o.iconBg} rounded-3xl flex items-center justify-center shadow-lg`}
                  >
                    <o.icon size={28} className="text-white" strokeWidth={2} />
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
                        color: o.color,
                        backgroundColor: `${o.color}15`,
                      }}
                    >
                      {o.amount}
                    </span>
                  </div>
                </div>
                <h3 className="text-[22px] font-semibold text-[#1D1D1F] mb-3">{o.title}</h3>
                <p className="text-[15px] text-[#86868b] mb-6 leading-relaxed">{o.desc}</p>

                {/* Features list */}
                <div className="space-y-2 mb-6">
                  {o.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[13px] text-[#86868b]">
                      <div className="w-1.5 h-1.5 bg-[#34C759] rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/open-account"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white bg-gradient-to-r ${winviewGradient} font-medium hover:scale-[1.02] active:scale-95 transition-all shadow-lg`}
                >
                  Apply now
                  <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </section>

          {/* Enhanced Process Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-[32px] font-semibold text-[#1D1D1F] mb-4">How It Works</h2>
              <p className="text-[18px] text-[#86868b]">
                Simple, fast, and secure loan approval process
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Apply Online',
                  desc: 'Quick 3-minute application with instant pre-qualification',
                  icon: Smartphone,
                  color: 'from-[#FF3B30] to-[#FF6B6B]',
                },
                {
                  step: '2',
                  title: 'Get Approved',
                  desc: 'AI-powered decision in under 60 seconds',
                  icon: Clock,
                  color: 'from-[#FF9500] to-[#FF9F0A]',
                },
                {
                  step: '3',
                  title: 'Receive Funds',
                  desc: 'Money transferred directly to your account',
                  icon: DollarSign,
                  color: 'from-[#34C759] to-[#30D158]',
                },
              ].map((item, i) => (
                <div key={item.step} className="text-center group">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon size={32} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="w-8 h-8 bg-[#1D1D1F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-[14px] font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-3">{item.title}</h3>
                  <p className="text-[15px] text-[#86868b] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Safety */}
          <div className="mt-14 bg-white/90 rounded-[28px] p-6 border border-white/60 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <p className="text-[15px] text-[#1D1D1F]">
              Transparent fees. No hidden charges. Bank-level encryption end-to-end.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
