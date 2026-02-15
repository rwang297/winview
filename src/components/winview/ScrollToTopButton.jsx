'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!showScrollTop) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-xl border border-[#E8E2D9] text-[#1D1D1F] rounded-full shadow-lg hover:bg-white hover:border-[#007AFF]/30 hover:text-[#007AFF] transition-all duration-300 ease-out hover:scale-105 active:scale-95 will-change-transform"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
