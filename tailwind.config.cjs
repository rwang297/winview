/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand - Professional & Trustworthy
        brand: {
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E8",
          300: "#A5BDDD",
          400: "#6E95C9",
          500: "#4A7DB8", // Primary brand blue
          600: "#3A63A0",
          700: "#2A4988",
          800: "#1A2F70",
          900: "#0F1B42",
        },
        // Secondary - Professional Purple
        accent: {
          50: "#FAF5FF",
          100: "#F5EBFF",
          200: "#EBD7FF",
          300: "#DEC3FF",
          400: "#C496FF",
          500: "#A96FEE", // Secondary accent
          600: "#8A4FD4",
          700: "#6B3BAA",
          800: "#4A2680",
          900: "#2D1656",
        },
        // Neutral - Trust & Clarity
        neutral: {
          0: "#FFFFFF",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        // Semantic - Success
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E", // Success green
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#145231",
        },
        // Semantic - Warning
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Semantic - Error
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        // Backgrounds
        bg: {
          light: "#FAF7F2", // Warm cream for light mode
          dark: "#0F0F12", // Deep dark for dark mode
          secondary: "#F5F3F0",
          tertiary: "#EEEBE7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
        serif: [
          '"Source Serif Pro"',
          '"Georgia"',
          "serif",
        ],
      },
      fontSize: {
        // Display sizes - Hero & Major headings
        "display-lg": ["56px", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }],
        "display-md": ["48px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.015em" }],
        "display-sm": ["40px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" }],

        // Heading sizes
        "heading-xl": ["32px", { lineHeight: "1.25", fontWeight: "700", letterSpacing: "-0.01em" }],
        "heading-lg": ["28px", { lineHeight: "1.35", fontWeight: "700", letterSpacing: "-0.005em" }],
        "heading-md": ["24px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0" }],
        "heading-sm": ["20px", { lineHeight: "1.5", fontWeight: "600", letterSpacing: "0" }],
        "heading-xs": ["18px", { lineHeight: "1.55", fontWeight: "600", letterSpacing: "0" }],

        // Body sizes
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0.25px" }],
        "body-xs": ["12px", { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0.5px" }],

        // Label & UI sizes
        label: ["14px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.25px" }],
        "label-sm": ["12px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.5px" }],

        // CTA & Button sizes
        "button-lg": ["18px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0" }],
        "button-md": ["16px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0" }],
        "button-sm": ["14px", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0" }],
      },
      spacing: {
        // xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, etc (default)
        // Additional spacing for common patterns
        gutter: "1.5rem", // 24px for horizontal gutters
        section: "3rem", // 48px for section spacing
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
    },
  },
  plugins: [],
};
