'use client';

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StaticBackButton() {
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    const updateBack = () => {
      try {
        setShowBack(window.location && window.location.pathname !== '/');
      } catch (e) {
        setShowBack(false);
      }
    };

    updateBack();
    window.addEventListener('popstate', updateBack);
    window.addEventListener('pushstate', updateBack);

    return () => {
      window.removeEventListener('popstate', updateBack);
      window.removeEventListener('pushstate', updateBack);
    };
  }, []);

  const handleBack = () => {
    try {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    } catch (e) {
      window.location.href = '/';
    }
  };

  if (!showBack) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        aria-label="Go back"
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-xl border border-[#E8E2D9] text-[#1D1D1F] rounded-full shadow-lg hover:bg-white hover:border-[#007AFF]/30 hover:text-[#007AFF] transition-all duration-300 ease-out hover:scale-105 active:scale-95 will-change-transform"
      >
        <ArrowLeft size={20} />
        <span className="text-[15px] font-medium">Back</span>
      </button>
    </div>
  );
}
