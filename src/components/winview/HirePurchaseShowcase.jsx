'use client';

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function HirePurchaseShowcase() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  useEffect(() => setIsMounted(true), []);

  const slides = useMemo(
    () => [
      {
        key: 'page1',
        image: 'https://ucarecdn.com/d69ea7a3-8dd1-4e37-a871-d0339bf362ba/-/format/auto/',
        alt: 'Hire purchase showcase page 1',
        bgColor: 'bg-gradient-to-br from-[#E8F4F8] via-[#F0F8FC] to-[#E1F0F5]', // Light blue-gray tones
        chipA: 'Up to 80 months',
        chipB: 'Fast approval',
      },
      {
        key: 'page2',
        image: 'https://ucarecdn.com/6c2a8626-e908-4f53-b370-39027ec1bb83/-/format/auto/',
        alt: 'Hire purchase showcase page 2',
        bgColor: 'bg-gradient-to-br from-[#FFF8E1] via-[#FFFBF0] to-[#F8F5E8]', // Warm cream tones
        chipA: 'Simple terms',
        chipB: 'Low entry',
      },
      {
        key: 'page3',
        image: 'https://ucarecdn.com/7cca2e18-fc1f-40a3-9a42-4f8335e0eec1/-/format/auto/',
        alt: 'Hire purchase showcase page 3',
        bgColor: 'bg-gradient-to-br from-[#F5F8FF] via-[#FAFCFF] to-[#EEF4FF]', // Soft blue-white tones
        chipA: 'Own your mini bus',
        chipB: 'Earn sooner',
      },
    ],
    []
  );

  const go = (dir) => {
    setIndex((prev) => (prev + (dir === 'next' ? 1 : -1) + slides.length) % slides.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length]);

  const iosFont = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  };

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };
  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartXRef.current;
    touchDeltaXRef.current = dx;
  };
  const onTouchEnd = () => {
    const dx = touchDeltaXRef.current;
    const threshold = 40;
    if (dx > threshold) go('prev');
    else if (dx < -threshold) go('next');
    touchStartXRef.current = 0;
    touchDeltaXRef.current = 0;
  };

  return (
    <section className="relative px-6 pt-6 pb-16 bg-[#FAF7F2]">
      <div className="pointer-events-none absolute -top-24 -left-10 w-[520px] h-[520px] bg-gradient-to-br from-[#007AFF]/8 to-[#5AC8FA]/8 rounded-full blur-[110px] animate-breathe" />
      <div
        className="pointer-events-none absolute -bottom-28 -right-16 w-[560px] h-[560px] bg-gradient-to-tl from-[#FFB86C]/8 to-[#FFD1A6]/8 rounded-full blur-[120px] animate-breathe"
        style={{ animationDelay: '1s' }}
      />

      <div className="max-w-[1280px] mx-auto">
        {/* iOS-style header badge */}
        <div
          className={`mb-6 transition-all duration-700 ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-white/60 shadow-sm">
            <ShieldCheck size={16} className="text-[#007AFF]" />
            <span className="text-xs font-semibold text-[#1D1D1F]" style={iosFont}>
              Hire Purchase Program
            </span>
          </div>
        </div>

        {/* Two-column layout: slider + writeup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Slider */}
          <div className="relative">
            {/* Dynamic background that changes with each slide */}
            <div className="overflow-hidden rounded-[28px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] relative">
              {/* Background container with smooth color transitions */}
              <div
                className={`absolute inset-0 transition-all duration-500 ease-out ${slides[index].bgColor}`}
              />

              <div
                className="flex transition-transform duration-500 ease-out relative z-10"
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {slides.map((s) => (
                  <div key={s.key} className="min-w-full">
                    {/* Match visual height; ensure overflow cuts edges for a centered, cropped look */}
                    <div className="relative h-[460px] md:h-[620px] lg:h-[740px] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.alt}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Larger iOS-style controls */}
            <button
              aria-label="Previous"
              onClick={() => go('prev')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-white/60 flex items-center justify-center shadow hover:bg-white"
            >
              <ChevronLeft size={20} className="text-[#1D1D1F]" />
            </button>
            <button
              aria-label="Next"
              onClick={() => go('next')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-white/60 flex items-center justify-center shadow hover:bg-white"
            >
              <ChevronRight size={20} className="text-[#1D1D1F]" />
            </button>

            {/* Larger dots */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.key}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-3 rounded-full transition-all ${
                      active ? 'w-8 bg-[#1D1D1F]' : 'w-3 bg-[#1D1D1F]/30'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* iOS-style writeup/CTA - remove flex wrapper and card box */}
          <div className="lg:pl-6 pt-2 md:pt-4 lg:pt-6">
            {/* Removed the rounded white container and ambient glow blobs */}
            <h2
              className="text-[42px] md:text-[52px] font-semibold text-[#1D1D1F] tracking-tight"
              style={iosFont}
            >
              Jump on our Hire Purchase Plan
            </h2>
            <p className="mt-5 text-[18px] md:text-[20px] text-[#86868b]" style={iosFont}>
              Salary earners and private individuals can own a Tricycle, Motorbike, or Mini Bus —
              and pay gradually for up to 80 months. Simple terms, clear payments, and fast
              approvals so you can start earning sooner.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Low entry cost',
                'Transparent payments',
                'Own as you earn',
                'Bank‑level support',
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#34C759]/15 text-[#34C759] flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-[14px] text-[#1D1D1F]" style={iosFont}>
                    {t}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-5 flex-wrap">
              <a
                href="/open-account?flow=hire-purchase"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white/90 text-[#1D1D1F] font-medium border border-white/70 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 transition"
                style={iosFont}
              >
                <span>Register now</span>
                <span className="w-8 h-8 rounded-full bg-[#007AFF] text-white flex items-center justify-center shadow transition-transform duration-200 group-hover:translate-x-0.5">
                  <ChevronRightIcon size={18} />
                </span>
              </a>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F2F7] text-[#1D1D1F]/70 border border-black/5 text-xs">
                <ShieldCheck size={14} className="text-[#34C759]" />
                <span style={iosFont}>Takes you to registration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle animations only */}
      <style jsx global>{`
        @keyframes fadeInUpSmall { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: .7;} 50% { transform: scale(1.06); opacity: 1; } }
      `}</style>
    </section>
  );
}
