'use client';

import useUser from '@/utils/useUser';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronDown, Menu, Moon, Phone, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const { data: user } = useUser();
  const { data: me } = useQuery({
    queryKey: ['header-admin-me'],
    enabled: !!user,
    queryFn: async () => {
      const res = await fetch('/api/admin/allowlist?me=1');
      if (!res.ok) return { isAdmin: false };
      return res.json();
    },
  });
  const isAdmin = !!me?.isAdmin;

  // iOS premium font stack to use across menu sections
  const iosText =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync initial theme
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  // Close the desktop dropdown when resizing to mobile or navigating
  useEffect(() => {
    if (!mobileMenuOpen) return;
    // close support dropdown if mobile menu is opened to avoid overlap in state
    setSupportOpen(false);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    try {
      const root = document.documentElement;
      const next = !isDark;
      setIsDark(next);
      root.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? 'bg-white dark:bg-neutral-900 shadow-md border-b border-neutral-200 dark:border-neutral-700' : 'bg-transparent border-transparent shadow-none backdrop-blur-0'} ${mobileMenuOpen ? '[--menu-open:1]' : ''}`}
      >
        <nav className="w-full px-6 lg:px-8">
          {/* make the header row slightly shorter on mobile so the 85px (desktop) / 72px (mobile) logo fits cleanly */}
          <div className="flex items-center justify-between h-20 lg:h-28">
            {/* Logo */}
            <div className="flex items-center gap-4 group">
              <a href="/" className="flex items-center gap-3 transition-all duration-300">
                <div className="relative">
                  {/* responsive logo size: 58px on mobile, 68px on large screens (20% smaller) */}
                  <div className="w-[58px] h-[58px] lg:w-[68px] lg:h-[68px] rounded-xl overflow-hidden shadow-sm">
                    <img
                      src="https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/512x512/center/-/quality/smart/-/format/auto/"
                      srcSet="https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/512x512/center/-/quality/smart/-/format/auto/ 1x, https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/1024x1024/center/-/quality/smart/-/format/auto/ 2x"
                      sizes="(min-width:1024px) 68px, 58px"
                      alt="Winview Logo"
                      className="w-full h-full object-cover"
                      decoding="async"
                    />
                  </div>
                  {/* Move the status dot inside the logo bounds on desktop to avoid overflow */}
                  <div className="absolute top-0 right-0 w-4 h-4 bg-success-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-xl lg:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight"
                    style={{
                      textShadow: scrolled
                        ? 'none'
                        : '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    Winview
                  </span>
                  <span
                    className="text-[11px] sm:text-xs font-bold gradient-brand-text uppercase tracking-widest whitespace-nowrap"
                    style={{
                      textShadow: scrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.08)',
                      letterSpacing: '0.18em',
                    }}
                  >
                    Microfinance Bank
                  </span>
                  <span
                    className="-mt-0.5 text-[11px] sm:text-xs font-bold gradient-brand-text uppercase tracking-widest whitespace-nowrap"
                    style={{
                      textShadow: scrolled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.08)',
                      letterSpacing: '0.18em',
                    }}
                  >
                    Limited
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center" style={{ fontFamily: iosText }}>
              <div className="flex items-center gap-8 mr-8">
                <a
                  href="/"
                  className="relative text-neutral-900 dark:text-neutral-100 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-all duration-300 group py-2"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Support dropdown (replaces Services) */}
                <div className="relative group" onMouseLeave={() => setSupportOpen(false)}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSupportOpen((v) => !v);
                    }}
                    className="flex items-center gap-1 text-neutral-900 dark:text-neutral-100 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-all duration-300 py-2 cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={supportOpen}
                  >
                    Support
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${supportOpen ? 'rotate-180' : 'group-hover:rotate-180'}`}
                    />
                  </a>
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-300 transform ${supportOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'} group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
                  >
                    <div className="p-2" style={{ fontFamily: iosText }}>
                      <a
                        href="/open-account"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-sm">
                          💳
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            Open Account
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            Start banking with us
                          </p>
                        </div>
                      </a>
                      <a
                        href="/savings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-success-100 dark:bg-success-500/20 flex items-center justify-center text-sm">
                          💰
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
                            Savings Plans
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            Grow your money
                          </p>
                        </div>
                      </a>
                      <a
                        href="/loans"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-warning-100 dark:bg-warning-500/20 flex items-center justify-center text-sm">
                          🏦
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Micro Loans</p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">Quick funding</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="/about"
                  className="relative text-neutral-900 dark:text-neutral-100 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-all duration-300 group py-2"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </a>

                {/* Rename direct Support link to Complaints so Support only opens dropdown */}
                <a
                  href="/complaints"
                  className="relative text-neutral-900 dark:text-neutral-100 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-all duration-300 group py-2"
                >
                  Complaints
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="/faq"
                  className="relative text-neutral-900 dark:text-neutral-100 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-all duration-300 group py-2"
                >
                  FAQ
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </a>

                {isAdmin && (
                  <a
                    href="/admin/dashboard"
                    className="relative text-neutral-900 dark:text-neutral-100 hover:text-accent-600 dark:hover:text-accent-400 font-semibold transition-all duration-300 group py-2"
                    title="Admin Dashboard"
                  >
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4" style={{ fontFamily: iosText }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors duration-200"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 px-4 py-2.5 text-neutral-900 dark:text-neutral-100 font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                >
                  <Phone size={18} />
                  <span className="hidden sm:inline">Call Us</span>
                </a>

                <a
                  href="/open-account"
                  className="btn-primary"
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 ease-in-out active:scale-95"
              style={{ fontFamily: iosText }}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out text-neutral-900 dark:text-neutral-100 ${
                    mobileMenuOpen
                      ? 'opacity-0 rotate-180 scale-50'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ease-in-out text-neutral-900 dark:text-neutral-100 ${
                    mobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 rotate-180 scale-50'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile overlay for airy feel - remove blur on small screens so content isn't blurry */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/40 md:bg-black/30 md:backdrop-blur-sm transition-opacity duration-300 ease-out ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu - raise z-index above overlay so it's never blurred */}
        <div
          className={`lg:hidden relative z-50 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } ${mobileMenuOpen ? 'menu-open' : 'menu-closed'}`}
        >
          <div className="px-4 sm:px-6 py-6">
            <div
              className={`menu-panel relative z-50 bg-white dark:bg-neutral-800 backdrop-blur-2xl border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg transition-all duration-300 ease-out ${
                mobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.98]'
              }`}
              style={{ fontFamily: iosText }}
            >
              <div className="space-y-6 p-1">
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  <a
                    href="/"
                    className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '60ms' }}
                  >
                    <span className="relative z-10">Home</span>
                    <ArrowRight
                      size={20}
                      className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                    />
                  </a>

                  {/* Support section (was Services) */}
                  <div className="space-y-3">
                    <p
                      className="menu-item text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-widest px-4"
                      style={{ '--delay': '100ms' }}
                    >
                      Support
                    </p>
                    <a
                      href="/open-account"
                      className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ '--delay': '140ms' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center relative z-10 text-sm">
                          💳
                        </div>
                        <span className="relative z-10">Open Account</span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                      />
                    </a>
                    <a
                      href="/savings"
                      className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ '--delay': '180ms' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-success-100 dark:bg-success-500/20 flex items-center justify-center relative z-10 text-sm">
                          💰
                        </div>
                        <span className="relative z-10">Savings Plans</span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                      />
                    </a>
                    <a
                      href="/loans"
                      className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ '--delay': '200ms' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-warning-100 dark:bg-warning-500/20 flex items-center justify-center relative z-10 text-sm">
                          🏦
                        </div>
                        <span className="relative z-10">Micro Loans</span>
                      </div>
                      <ArrowRight
                        size={20}
                        className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                      />
                    </a>
                  </div>

                  <a
                    href="/about"
                    className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '220ms' }}
                  >
                    <span className="relative z-10">About</span>
                    <ArrowRight
                      size={20}
                      className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                    />
                  </a>

                  {/* Rename Support link to Complaints */}
                  <a
                    href="/complaints"
                    className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '260ms' }}
                  >
                    <span className="relative z-10">Complaints</span>
                    <ArrowRight
                      size={20}
                      className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                    />
                  </a>

                  <a
                    href="/faq"
                    className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '300ms' }}
                  >
                    <span className="relative z-10">FAQ</span>
                    <ArrowRight
                      size={20}
                      className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                    />
                  </a>

                  {isAdmin && (
                    <a
                      href="/admin/dashboard"
                      className="menu-item group flex items-center justify-between py-3 px-4 text-base font-semibold text-neutral-900 dark:text-neutral-100 transition-all duration-300 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 shadow-sm active:scale-[0.98]"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ '--delay': '340ms' }}
                    >
                      <span className="relative z-10">Admin</span>
                      <ArrowRight
                        size={20}
                        className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300 relative z-10"
                      />
                    </a>
                  )}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <a
                    href="tel:+1234567890"
                    className="menu-item group flex items-center justify-center gap-3 w-full py-3 px-4 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold rounded-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '380ms' }}
                  >
                    <Phone size={18} className="relative z-10" />
                    <span className="relative z-10">Call Us Now</span>
                  </a>

                  <a
                    href="/open-account"
                    className="menu-item btn-primary flex items-center justify-center gap-3 w-full active:scale-[0.98]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ '--delay': '420ms' }}
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight size={18} className="relative z-10" />
                  </a>

                  {/* Mobile theme toggle */}
                  <button
                    onClick={toggleTheme}
                    className="menu-item w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-600 active:scale-[0.98]"
                    style={{ '--delay': '460ms' }}
                  >
                    {isDark ? (
                      <Sun size={18} className="relative z-10" />
                    ) : (
                      <Moon size={18} className="relative z-10" />
                    )}
                    <span className="relative z-10">{isDark ? 'Light mode' : 'Dark mode'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20 lg:h-28" />

      {/* Animations for mobile menu smoothness */}
      <style jsx global>{`
        @keyframes menuItemIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuPanelIn {
          0% { opacity: 0; transform: translateY(-8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes menuPanelOut {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-8px) scale(0.98); }
        }
        header:has([aria-expanded="true"]) .menu-panel { animation: menuPanelIn 300ms cubic-bezier(0.22,1,0.36,1) both; }
        header:not(:has([aria-expanded="true"])) .menu-panel { animation: menuPanelOut 300ms cubic-bezier(0.22,1,0.36,1) both; }
        .menu-open .menu-item { opacity: 0; animation: menuItemIn 300ms cubic-bezier(0.22,1,0.36,1) forwards; animation-delay: var(--delay, 0ms); }
      `}</style>
    </>
  );
}
