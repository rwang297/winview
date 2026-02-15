import { ArrowRight, ChevronRight, Lock, Play, ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // ADD: 3D tilt and balance count-up state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTilting, setIsTilting] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const balanceRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // ADD: IntersectionObserver to trigger count-up once
  useEffect(() => {
    if (typeof window === 'undefined' || !balanceRef.current || hasAnimated) return;
    const el = balanceRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Count up to 12450 over 1.2s with easing
          const target = 12450;
          const duration = 1200;
          const start = performance.now();
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
          const loop = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = easeOutCubic(progress);
            const value = Math.floor(target * eased);
            setDisplayBalance(value);
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(loop);
            }
          };
          rafRef.current = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasAnimated]);

  // ADD: Tilt handlers for the phone mock
  const handlePhoneMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * 16; // degrees
    const rotateX = -(y - 0.5) * 12; // degrees
    setTilt({ x: rotateY, y: rotateX });
  };
  const handlePhoneEnter = () => setIsTilting(true);
  const handlePhoneLeave = () => {
    setIsTilting(false);
    setTilt({ x: 0, y: 0 });
  };

  // Pre-compute values to keep JSX clean
  const phoneTransform = `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${isTilting ? 1.02 : 1})`;
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });
  const balanceText = formatter.format(displayBalance);

  return (
    <section
      className="relative -mt-20 lg:-mt-28 pt-20 lg:pt-28 pb-20 px-6 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-cyan-50 dark:bg-neutral-900"
      onMouseMove={handleMouseMove}
    >
      {/* Bright gradient background */}
      <div className="absolute inset-0 z-0 -top-20 lg:-top-28 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-neutral-900/50 dark:via-neutral-900 dark:to-neutral-900/50" />

      {/* Background Image - Extended to cover header */}
      <div className="absolute inset-0 z-0 -top-20 lg:-top-28">
        <img
          src="https://raw.createusercontent.com/e4c7154d-a7bb-4f7a-9126-0a9ba6fa1e50/"
          alt="Abstract Background"
          className="w-full h-[calc(100%+5rem)] lg:h-[calc(100%+7rem)] object-cover opacity-[0.08] mix-blend-overlay transition-opacity duration-700 ease-out"
          decoding="async"
          fetchpriority="high"
        />
        {/* Light overlay for brightness */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/60 dark:via-neutral-900/30 dark:to-neutral-900/60" />
      </div>

      {/* Dynamic Background Mesh - Bright and friendly */}
      <div
        className="absolute top-[-40%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-blue-300/20 to-cyan-300/15 rounded-full blur-[120px] mix-blend-screen will-change-transform"
        style={{
          animation: 'float 8s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`,
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-emerald-200/15 to-amber-200/12 rounded-full blur-[100px] will-change-transform"
        style={{
          animation: 'float 6s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate-reverse',
          transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`,
        }}
      />
      {/* Warm ambient glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-br from-blue-200/12 to-purple-200/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10 pt-32">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center auto-rows-max`}>
          <div
            className={`text-center lg:text-left max-w-[650px] mx-auto lg:mx-0 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 pl-1 pr-3 py-1 bg-white/95 dark:bg-neutral-800/90 backdrop-blur-lg border border-neutral-200/80 dark:border-neutral-700/80 rounded-full mb-8 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 ease-out cursor-default will-change-transform">
              <span className="bg-accent-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Soon
              </span>
              <span className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-200 flex items-center gap-1">
                Mobile app is coming soon
                <ChevronRight size={12} className="text-neutral-500 dark:text-neutral-400" />
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-[56px] md:text-[72px] lg:text-[76px] font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 lg:mb-8"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                animation: 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both',
                letterSpacing: '-0.02em',
              }}
            >
              Banking. <br />
              <span className="gradient-brand-text">
                Reimagined.
              </span>
            </h1>

            {/* Supporting text */}
            <p
              className="text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 mb-10 lg:mb-12 max-w-[550px] mx-auto lg:mx-0 font-normal"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
                animation: 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both',
              }}
            >
              Experience the fluidity of modern finance. Intelligent, secure, and designed for your
              lifestyle.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-5"
              style={{
                animation: 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both',
              }}
            >
              <a
                href="/open-account"
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Open Account</span>
                <ArrowRight size={18} />
              </a>
              <a
                href="#app-coming-soon"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-brand-600 dark:text-brand-400 rounded-lg font-semibold border border-neutral-200/80 dark:border-neutral-700/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:shadow-md transition-all duration-300 ease-out active:scale-[0.98] will-change-transform"
              >
                <ShieldCheck size={18} />
                <span>Secure banking</span>
                <ChevronRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className="mt-14 lg:mt-16 flex items-center gap-6 text-neutral-700 dark:text-neutral-300 text-sm font-medium"
              style={{
                animation: 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s both',
              }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-white dark:border-neutral-800 flex items-center justify-center text-[10px] overflow-hidden transition-transform duration-200 hover:scale-110 hover:z-10 relative will-change-transform shadow-sm"
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="user"
                      className="transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
              <p className="flex items-center gap-2">
                <Lock size={16} className="text-success-500" /> Trusted by 10,000+ members
              </p>
            </div>
          </div>

          {/* Hero Image / Interaction */}
          <div
            className={`relative transition-all duration-1000 delay-300 ease-out transform flex justify-center ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div
              className="relative z-10 rounded-[40px] overflow-hidden shadow-lg dark:shadow-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 transition-all duration-500 ease-out will-change-transform max-w-[340px] w-full"
              style={{ transform: phoneTransform }}
              onMouseMove={handlePhoneMove}
              onMouseEnter={handlePhoneEnter}
              onMouseLeave={handlePhoneLeave}
            >
              {/* iOS status bar mock */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent z-20 pointer-events-none" />

              {/* Screen */}
              <div className="bg-white dark:bg-neutral-900 p-8 min-h-[520px] flex flex-col relative overflow-hidden">
                {/* shimmer sweep overlay */}
                <div className="pointer-events-none absolute -top-1/2 -left-1/3 w-1/2 h-[200%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />

                <div className="flex justify-between items-center mb-8">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center aspect-square transition-all duration-200 overflow-hidden">
                    <img
                      src="https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/512x512/center/-/quality/smart/-/format/auto/"
                      srcSet="https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/512x512/center/-/quality/smart/-/format/auto/ 1x, https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/1024x1024/center/-/quality/smart/-/format/auto/ 2x"
                      sizes="28px"
                      alt="Winview Microfinance Logo"
                      className="w-7 h-7 object-cover"
                      decoding="async"
                      loading="eager"
                    />
                  </div>
                  <div
                    className="w-24 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                </div>

                {/* Balance Card with animated amount */}
                <div
                  ref={balanceRef}
                  className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-700 p-8 rounded-2xl text-white shadow-xl mb-6 relative overflow-hidden group transition-all duration-500 ease-out border border-white/5 dark:border-white/5"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/4 rounded-full blur-3xl -mr-10 -mt-10" />
                  <p className="text-white/70 mb-2 font-medium text-sm">Total Balance</p>
                  <h3 className="text-4xl font-bold mb-8 tracking-tight">{balanceText}</h3>
                  <div className="flex gap-3">
                    <div className="h-10 w-10 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:bg-white/25 hover:scale-110 cursor-pointer will-change-transform">
                      <ArrowRight size={18} className="-rotate-45" />
                    </div>
                    <div className="h-10 w-10 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-md transition-all duration-200 hover:bg-white/25 hover:scale-110 cursor-pointer will-change-transform">
                      <Play size={18} className="fill-white" />
                    </div>
                  </div>
                  {/* subtle light sweep on hover */}
                  <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100">
                    <div className="absolute -top-1/2 -left-1/2 w-[140%] h-[200%] rotate-[30deg] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="space-y-3">
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider ml-2">
                    Recent
                  </p>
                  {[1, 2, 3].map((i) => {
                    const bg =
                      i === 1
                        ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300'
                        : i === 2
                          ? 'bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-300'
                          : 'bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-300';
                    const label =
                      i === 1 ? 'Apple Store' : i === 2 ? 'Salary Deposit' : 'Starbucks';
                    const amount = i === 2 ? '+₦4,500.00' : i === 1 ? '-₦1,099.00' : '-₦12.50';
                    return (
                      <div
                        key={i}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-xl flex items-center justify-between shadow-sm dark:shadow-none border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all duration-300 ease-out cursor-pointer hover:scale-[1.01] will-change-transform"
                        style={{
                          animationDelay: `${0.8 + i * 0.1}s`,
                          animation: 'fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 text-lg ${bg}`}
                          >
                            {i === 1 ? '🛍️' : i === 2 ? '💰' : '☕'}
                          </div>
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                              {label}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                              Today, 10:23 AM
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-semibold text-sm ${i === 2 ? 'text-success-600 dark:text-success-400' : 'text-neutral-900 dark:text-neutral-100'}`}
                        >
                          {amount}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Floating particles around phone */}
                <div className="pointer-events-none absolute -right-6 top-10 hidden lg:block">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-700 backdrop-blur-xl shadow-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-600 animate-orbitSlow text-lg">
                    ⚡
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-6 bottom-10 hidden lg:block">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-700 backdrop-blur-xl shadow-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-600 animate-orbit text-lg">
                    ✅
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card on side */}
            <div
              className="absolute top-1/2 -right-12 bg-white dark:bg-neutral-800 backdrop-blur-xl p-5 rounded-xl shadow-xl hover:shadow-2xl border border-neutral-200/80 dark:border-neutral-700/80 hidden lg:block z-20 will-change-transform transition-all duration-500"
              style={{
                animation: 'float 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                animationDelay: '1s',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-500 rounded-lg flex items-center justify-center transition-all duration-200">
                  <ArrowRight size={18} className="text-white -rotate-45" />
                </div>
                <div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">Income</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">+ ₦4,250.00</p>
                </div>
              </div>
            </div>

            {/* Friendly floating feature cards */}
            <div className="hidden lg:block absolute -left-10 top-32 z-10">
              <div
                className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-48"
                style={{
                  animation: 'float 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: '0.5s',
                }}
              >
                <div className="text-3xl mb-2">💳</div>
                <p className="font-semibold text-sm">Instant Cards</p>
                <p className="text-xs text-blue-100 mt-1">Get your virtual card instantly</p>
              </div>
            </div>

            <div className="hidden lg:block absolute right-0 bottom-40 z-10">
              <div
                className="bg-gradient-to-br from-emerald-400 to-emerald-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-48"
                style={{
                  animation: 'float 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: '1.5s',
                }}
              >
                <div className="text-3xl mb-2">🛡️</div>
                <p className="font-semibold text-sm">Bank-Grade Security</p>
                <p className="text-xs text-emerald-100 mt-1">Your money is always safe</p>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-20 top-48 z-10">
              <div
                className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-48"
                style={{
                  animation: 'float 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  animationDelay: '2s',
                }}
              >
                <div className="text-3xl mb-2">⚡</div>
                <p className="font-semibold text-sm">Lightning Fast</p>
                <p className="text-xs text-purple-100 mt-1">Transfers in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .animate-shimmer { animation: shimmer 1.8s ease-in-out infinite; }
        @keyframes orbit {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(8px, -8px, 0) rotate(5deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        .animate-orbit { animation: orbit 4s ease-in-out infinite; }
        .animate-orbitSlow { animation: orbit 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
