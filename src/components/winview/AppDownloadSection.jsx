import {
  Apple,
  ArrowRight,
  Clock,
  CreditCard,
  Download,
  Send,
  ShieldCheck,
  Smartphone,
  Star,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react'; // added hooks for animations and observers

export default function AppDownloadSection() {
  // --- Animation state (tilt + visibility + count up) ---
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [balance, setBalance] = useState(0);

  // Enhanced tilt state for the phone wrapper
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });
  const [isHovering, setIsHovering] = useState(false);

  // Transaction animation state
  const [activeTransaction, setActiveTransaction] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // currency formatter (₦)
  const formatter = useMemo(() => {
    try {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
      });
    } catch (e) {
      // Fallback if Intl not available for any reason
      return {
        format: (n) =>
          `₦${Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      };
    }
  }, []);

  useEffect(() => {
    // Observe when section enters viewport to trigger animations once
    if (!sectionRef.current || typeof window === 'undefined') return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Count up balance only once when visible
    if (!inView || hasAnimated) return;
    setHasAnimated(true);

    const target = 12450; // final balance
    const duration = 1500; // increased duration for smoother effect
    const start = performance.now();

    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4); // stronger ease for more dramatic effect
      setBalance(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else setBalance(target);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, hasAnimated]);

  // Enhanced transaction cycling effect
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveTransaction((prev) => (prev + 1) % 4);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  const handleTilt = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width; // 0..1
    const y = (e.clientY - bounds.top) / bounds.height; // 0..1
    const ry = (x - 0.5) * 20; // increased rotation range
    const rx = -(y - 0.5) * 15; // increased rotation range
    setTilt({ rx, ry, scale: 1.05 }); // slightly larger scale
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ rx: 0, ry: 0, scale: 1 });
  };

  const transactions = [
    {
      icon: '🛒',
      name: 'Apple Store',
      amount: '-₦1,099',
      time: '2:34 PM',
      color: 'bg-blue-500',
    },
    {
      icon: '💰',
      name: 'Salary Deposit',
      amount: '+₦45,000',
      time: '9:00 AM',
      color: 'bg-green-500',
    },
    {
      icon: '☕',
      name: 'Starbucks',
      amount: '-₦3,500',
      time: '11:15 AM',
      color: 'bg-orange-500',
    },
    {
      icon: '🎵',
      name: 'Spotify Premium',
      amount: '-₦1,200',
      time: '8:22 PM',
      color: 'bg-purple-500',
    },
  ];

  return (
    <section
      id="app-coming-soon"
      className="py-32 px-6 bg-[#000000] overflow-hidden relative"
      ref={sectionRef}
    >
      {/* Enhanced Background Glows with Animation */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 to-cyan-400/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-600/30 to-pink-400/20 rounded-full blur-[120px] animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full blur-[100px] animate-breathe" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left">
            {/* Coming Soon pill */}
            <div className="inline-flex items-center gap-2 pl-2 pr-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-4 text-white animate-glow">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-shimmer-bg">
                Soon
              </span>
              <span className="text-[12px] opacity-80">Launching on iOS and Android</span>
            </div>

            <h2
              className="text-[48px] md:text-[64px] font-semibold text-white mb-6 tracking-tight leading-[1.1]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
              }}
            >
              The bank in <br />
              your pocket.
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0">
              Our mobile app is in the final stretch. Be the first to experience seamless, secure
              banking on the go.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              {/* iOS Button (disabled state) */}
              <button
                type="button"
                disabled
                className="group flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all opacity-70 cursor-not-allowed hover:bg-white/15"
                aria-disabled="true"
                title="Coming soon on the App Store"
              >
                <Apple size={36} className="text-white" />
                <div className="text-left text-white">
                  <div className="text-[11px] opacity-60 uppercase tracking-wide">App Store</div>
                  <div className="text-[19px] font-semibold leading-tight flex items-center gap-2">
                    Coming Soon <Clock size={16} className="opacity-70 animate-spin-slow" />
                  </div>
                </div>
              </button>

              {/* Android Button (disabled state) */}
              <button
                type="button"
                disabled
                className="group flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 transition-all opacity-70 cursor-not-allowed hover:bg-white/15"
                aria-disabled="true"
                title="Coming soon on Google Play"
              >
                <Smartphone size={36} className="text-white" />
                <div className="text-left text-white">
                  <div className="text-[11px] opacity-60 uppercase tracking-wide">Google Play</div>
                  <div className="text-[19px] font-semibold leading-tight flex items-center gap-2">
                    Coming Soon <Clock size={16} className="opacity-70 animate-spin-slow" />
                  </div>
                </div>
              </button>
            </div>

            {/* Enhanced timeline hint */}
            <div className="flex items-center justify-center lg:justify-start gap-4 border-t border-white/10 pt-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Final testing underway</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>Join us now and get notified at launch</div>
            </div>
          </div>

          {/* Enhanced Visual Side - Interactive 3D Phone */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Enhanced Phone Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#007AFF] via-[#5856D6] to-[#007AFF] opacity-40 blur-[100px] rounded-full animate-breathe" />

            {/* Enhanced floating particles with better animations */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                {
                  icon: <Zap size={20} className="text-yellow-400" />,
                  delay: '0s',
                  path: 'float-particle-1',
                },
                {
                  icon: <ShieldCheck size={18} className="text-green-400" />,
                  delay: '1s',
                  path: 'float-particle-2',
                },
                {
                  icon: <CreditCard size={18} className="text-blue-400" />,
                  delay: '2s',
                  path: 'float-particle-3',
                },
                {
                  icon: <Send size={16} className="text-purple-400" />,
                  delay: '0.5s',
                  path: 'float-particle-4',
                },
              ].map((particle, i) => (
                <div
                  key={i}
                  className={`absolute animate-${particle.path} filter drop-shadow-lg`}
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${15 + (i % 2) * 70}%`,
                    animationDelay: particle.delay,
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    {particle.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced 3D Tilt Wrapper */}
            <div
              onMouseMove={handleTilt}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              style={{
                perspective: '1500px',
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              <div
                className="relative z-10 w-[320px] h-[640px] bg-black rounded-[52px] border-[10px] border-[#1c1c1e] shadow-2xl overflow-hidden transition-all duration-700 ease-out"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale}) translateZ(${isHovering ? '20px' : '0px'})`,
                  boxShadow: isHovering
                    ? '0 40px 80px -12px rgba(0, 122, 255, 0.4), 0 20px 40px -8px rgba(0, 0, 0, 0.3)'
                    : '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Enhanced Notch with animation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-black rounded-b-3xl z-20">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full" />
                </div>

                {/* Screen Content with enhanced animations */}
                <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
                  {/* Enhanced Header with dynamic shine and gradient */}
                  <div className="relative bg-gradient-to-br from-[#007AFF] to-[#5856D6] p-6 pt-14 text-white overflow-hidden">
                    {/* Animated background patterns */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_50%)] animate-gradientShift" />
                      <div
                        className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.3),transparent_50%)] animate-gradientShift"
                        style={{ animationDelay: '1s' }}
                      />
                    </div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <ShieldCheck size={24} className="animate-pulse-gentle" />
                      <div
                        className="w-8 h-8 bg-white/20 rounded-full animate-pulse-gentle"
                        style={{ animationDelay: '0.5s' }}
                      />
                    </div>
                    <p
                      className="opacity-90 text-sm mb-1 relative z-10 animate-slideInUp"
                      style={{ animationDelay: '0.2s' }}
                    >
                      Total Balance
                    </p>
                    <h2
                      className="text-3xl font-bold relative z-10 animate-slideInUp"
                      style={{ animationDelay: '0.4s' }}
                    >
                      {formatter.format(balance)}
                    </h2>

                    {/* Enhanced shine sweep with multiple layers */}
                    <div className="pointer-events-none absolute -inset-y-6 -left-60 w-60 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-slow" />
                    <div
                      className="pointer-events-none absolute -inset-y-6 -left-40 w-40 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine-slow"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>

                  {/* Enhanced Body */}
                  <div className="flex-1 bg-[#F5F5F7] p-4 space-y-4 relative overflow-hidden">
                    {/* Enhanced Action Row */}
                    <div className="flex gap-4 mb-6">
                      {[
                        {
                          action: 'Send',
                          icon: <Send size={16} />,
                          color: 'bg-blue-500',
                        },
                        {
                          action: 'Request',
                          icon: <ArrowRight size={16} className="rotate-180" />,
                          color: 'bg-green-500',
                        },
                        {
                          action: 'Pay',
                          icon: <CreditCard size={16} />,
                          color: 'bg-purple-500',
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-white p-4 rounded-2xl text-center shadow-sm animate-popIn hover:scale-105 transition-transform duration-200 cursor-pointer"
                          style={{ animationDelay: `${0.6 + 0.1 * i}s` }}
                        >
                          <div
                            className={`w-10 h-10 ${item.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white`}
                          >
                            {item.icon}
                          </div>
                          <span className="text-xs font-medium text-gray-900">{item.action}</span>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Transaction List with cycling animation */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900">Recent Activity</span>
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      {transactions.map((transaction, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0 transition-all duration-500 ${
                            activeTransaction === i ? 'bg-blue-50 -mx-2 px-2 py-2 rounded-lg' : ''
                          }`}
                          style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${transaction.color} flex items-center justify-center text-white text-lg transition-transform duration-300 ${
                              activeTransaction === i ? 'scale-110' : ''
                            }`}
                          >
                            {transaction.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {transaction.name}
                            </div>
                            <div className="text-xs text-gray-500">{transaction.time}</div>
                          </div>
                          <div
                            className={`font-semibold text-sm ${
                              transaction.amount.startsWith('+')
                                ? 'text-green-600'
                                : 'text-gray-900'
                            } transition-colors duration-300`}
                          >
                            {transaction.amount}
                          </div>
                          {activeTransaction === i && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping absolute right-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Tab Bar */}
                  <div className="bg-white p-4 border-t border-gray-200 flex justify-around">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full transition-all duration-300 ${
                          i === 1 ? 'bg-[#007AFF] scale-110' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Enhanced glow ring with pulsing effect */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[52px] ring-4 transition-all duration-700 ${
                    isHovering ? 'ring-[#007AFF]/30 scale-105' : 'ring-[#007AFF]/0'
                  }`}
                />
              </div>
            </div>

            {/* Enhanced Second Phone (Background) with better positioning */}
            <div className="absolute z-0 top-16 -right-16 w-[300px] h-[600px] bg-black rounded-[48px] border-[8px] border-[#2c2c2e] shadow-2xl overflow-hidden transform rotate-[12deg] opacity-40 blur-[2px] animate-float-slow">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
            </div>

            {/* Notification popup */}
            {showNotification && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 animate-slideDown z-30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Transaction Complete</p>
                    <p className="text-xs text-gray-600">
                      {transactions[activeTransaction]?.amount}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes shine-slow {
          0% { transform: translateX(-100%) rotate(12deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(300px) rotate(12deg); opacity: 0; }
        }
        @keyframes gradientShift {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(-10%) translateY(5%) scale(1.1); }
          50% { transform: translateX(5%) translateY(-8%) scale(0.9); }
          75% { transform: translateX(-5%) translateY(3%) scale(1.05); }
        }
        @keyframes popIn {
          0% { transform: scale(0.8) translateY(10px); opacity: 0; }
          60% { transform: scale(1.05) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(14deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
        }
        @keyframes shimmer-bg {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float-particle-1 {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          33% { transform: translate3d(10px,-15px,0) rotate(5deg); }
          66% { transform: translate3d(-8px,-10px,0) rotate(-3deg); }
        }
        @keyframes float-particle-2 {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          33% { transform: translate3d(-12px,8px,0) rotate(-4deg); }
          66% { transform: translate3d(15px,-5px,0) rotate(6deg); }
        }
        @keyframes float-particle-3 {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(8px,12px,0) rotate(3deg); }
        }
        @keyframes float-particle-4 {
          0%, 100% { transform: translate3d(0,0,0) rotate(0deg); }
          25% { transform: translate3d(-6px,-8px,0) rotate(-2deg); }
          75% { transform: translate3d(12px,6px,0) rotate(4deg); }
        }
        
        .animate-popIn { animation: popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out both; }
        .animate-slideDown { animation: slideDown 0.4s ease-out both; }
        .animate-breathe { animation: breathe 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-shimmer-bg { 
          animation: shimmer-bg 3s ease-in-out infinite;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
        }
        .animate-gradientShift { animation: gradientShift 12s ease-in-out infinite; }
        .animate-shine-slow { animation: shine-slow 4s ease-in-out infinite; }
        .animate-float-particle-1 { animation: float-particle-1 8s ease-in-out infinite; }
        .animate-float-particle-2 { animation: float-particle-2 10s ease-in-out infinite; }
        .animate-float-particle-3 { animation: float-particle-3 6s ease-in-out infinite; }
        .animate-float-particle-4 { animation: float-particle-4 9s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
