import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTopButton from '../components/winview/ScrollToTopButton';
import StaticBackButton from '../components/winview/StaticBackButton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Initialize theme early to avoid flashing wrong theme */}
        <script>{`
          (function() {
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var useDark = stored ? stored === 'dark' : prefersDark;
              var root = document.documentElement;
              if (useDark) { root.classList.add('dark'); } else { root.classList.remove('dark'); }
            } catch (_) {}
          })();
        `}</script>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
            
            /* Define a responsive header height used for smooth anchor offset */
            :root { --headerH: 5rem; }
            @media (min-width: 1024px) { :root { --headerH: 7rem; } }
            
            html {
              scroll-behavior: smooth !important;
              scroll-padding-top: var(--headerH); /* prevent anchor targets from hiding behind fixed header */
              scrollbar-width: thin;
              scrollbar-color: #E8E2D9 transparent; /* warm thumb on transparent track */
            }
            html.dark { scrollbar-color: #2A2A2A transparent; }
            
            /* Ensure in-page anchors land with breathing room below the fixed header */
            [id] { scroll-margin-top: var(--headerH); }
            
            html::-webkit-scrollbar { width: 8px; }
            html::-webkit-scrollbar-track { background: transparent; }
            html::-webkit-scrollbar-thumb { background: #E8E2D9; border-radius: 4px; }
            html::-webkit-scrollbar-thumb:hover { background: #D8D0C6; }
            html.dark::-webkit-scrollbar-thumb { background: #2A2A2A; }
            html.dark::-webkit-scrollbar-thumb:hover { background: #333333; }
            
            /* Momentum scrolling on iOS for scrollable areas */
            .overflow-auto, .overflow-y-auto, .overflow-x-auto { -webkit-overflow-scrolling: touch; }
            
            /* Enhanced page transitions */
            .page-transition { animation: pageEnter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
            @keyframes pageEnter { from { opacity: 0; transform: translateY(20px) scale(0.98);} to { opacity: 1; transform: translateY(0) scale(1);} }
            
            /* Smooth link transitions */
            a { transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; }
            
            /* Enhanced button interactions */
            button, .button { transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; transform-origin: center center; }
            button:active, .button:active { transform: scale(0.98); }
            
            /* Smooth image loading */
            img { transition: opacity 0.3s ease-out, transform 0.3s ease-out; }
            
            /* Better motion for reduced motion preferences */
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
              }
            }
            
            /* Performance optimizations */
            .will-change-transform { will-change: transform; }
            .will-change-opacity { will-change: opacity; }
            .gpu-accelerated { transform: translateZ(0); -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-perspective: 1000; perspective: 1000; }
          `,
          }}
        />
      </head>
      <body className="antialiased bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <QueryClientProvider client={queryClient}>
          <div className="page-transition gpu-accelerated">{children}</div>
          <StaticBackButton />
          <ScrollToTopButton />
        </QueryClientProvider>
      </body>
    </html>
  );
}
