'use client';

import useUser from '@/utils/useUser';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const iosText =
    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    setSupportOpen(false);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/10 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="w-full px-3 lg:px-6">
          <div className="flex items-center justify-between h-20 lg:h-28">
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <a href="/" className="flex items-center gap-2 transition-all duration-300">
                <div className="relative">
                  <div className="w-[58px] h-[58px] lg:w-[68px] lg:h-[68px] rounded-xl overflow-hidden shadow-sm">
                    <img
                      src="https://ucarecdn.com/a074ace0-7537-49fc-8fc2-efaa47ded78a/-/crop/512x512/center/-/quality/smart/-/format/auto/"
                      alt="Winview Logo"
                      className="w-full h-full object-cover"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="text-xl lg:text-2xl font-black text-gray-800 tracking-tight">
                    Winview
                  </span>
                  <span
                    className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-800 whitespace-nowrap"
                    style={{ letterSpacing: '0.18em' }}
                  >
                    Microfinance Bank
                  </span>
                  <span
                    className="-mt-0.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gray-800 whitespace-nowrap"
                    style={{ letterSpacing: '0.18em' }}
                  >
                    Limited
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div
              className="hidden lg:flex items-center"
              style={{ fontFamily: iosText }}
            >
                <div className="flex items-center gap-8 mr-8 text-gray-800 font-semibold text-lg tracking-wide">

                <a href="/" className="hover:opacity-80 transition">
                  Home
                </a>

                <div
                  className="relative group"
                  onMouseLeave={() => setSupportOpen(false)}
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSupportOpen((v) => !v);
                    }}
                    className="flex items-center gap-1 hover:opacity-80 transition cursor-pointer"
                  >
                    Support
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        supportOpen ? 'rotate-180' : 'group-hover:rotate-180'
                      }`}
                    />
                  </a>

                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg transition-all duration-300 transform ${
                      supportOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2'
                    } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
                  >
                    <div className="p-2 text-black">
                      <a href="/open-account" className="block p-3 rounded-lg hover:bg-neutral-100">
                        💳 Open Account
                      </a>
                      <a href="/savings" className="block p-3 rounded-lg hover:bg-neutral-100">
                        💰 Savings Plans
                      </a>
                      <a href="/loans" className="block p-3 rounded-lg hover:bg-neutral-100">
                        🏦 Micro Loans
                      </a>
                    </div>
                  </div>
                </div>

                <a href="/about" className="hover:opacity-80 transition">
                  About
                </a>
                <a href="/complaints" className="hover:opacity-80 transition">
                  Complaints
                </a>
                <a href="/faq" className="hover:opacity-80 transition">
                  FAQ
                </a>

                {isAdmin && (
                  <a href="/admin/dashboard" className="hover:opacity-80 transition font-semibold">
                    Admin
                  </a>
                )}
              </div>

              {/* Only Call button remains */}
              <div className="flex items-center">
                <a
                  href="tel:+1234567890"
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-800 font-medium rounded-lg hover:bg-gray-200/20 transition"
                >
                  <Phone size={18} />
                  <span className="hidden sm:inline">Call Us</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-800 rounded-lg transition active:scale-95"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <div className="h-20 lg:h-28" />
    </>
  );
}
