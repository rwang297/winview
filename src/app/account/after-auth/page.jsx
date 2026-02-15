'use client';

import { useEffect, useState } from 'react';

export default function AfterAuthRedirect() {
  const [nonAdminBanner, setNonAdminBanner] = useState(false);

  // Decide final destination after sign-in/sign-up based on admin status
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const params = new URLSearchParams(
          typeof window !== 'undefined' ? window.location.search : ''
        );
        const cb = params.get('callbackUrl');

        // Ask backend if current session is an admin
        const res = await fetch('/api/admin/allowlist?me=1');
        // If the check fails for any reason, be safe and send to home
        if (!res.ok) {
          if (!cancelled) window.location.replace('/');
          return;
        }
        const me = await res.json();
        const isAdmin = !!me?.isAdmin;

        if (isAdmin) {
          // If there was an original admin callback, honor it; else go to dashboard
          const target = cb && cb.startsWith('/admin') ? cb : '/admin/dashboard';
          if (!cancelled) window.location.replace(target);
        } else {
          // Non-admins: show small banner then send home
          if (!cancelled) setNonAdminBanner(true);
          setTimeout(() => {
            if (!cancelled) window.location.replace('/');
          }, 1500);
        }
      } catch (e) {
        console.error('AfterAuth redirect failed', e);
        if (!cancelled) window.location.replace('/');
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#E5E5E7] border-t-[#7b5aff] rounded-full animate-spin" />
        <div className="text-[#86868b] font-medium">Signing you in…</div>
      </div>

      {nonAdminBanner && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-xl shadow-lg">
          Access denied — redirecting to Home…
        </div>
      )}
    </div>
  );
}
