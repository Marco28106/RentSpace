/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#063C2F",
          dark: "#042E25",
          hover: "#075342",
          soft: "#E8F0ED",
          accent: "#1A5C4C",
        },
        accent: {
          gold: "#A58A54",
          amber: "#F59E0B",
        },
        surface: {
          base: "#FAF9F6",
          secondary: "#F4F3EF",
          card: "#FFFFFF",
          footer: "#F3F2EE",
          dark: "#063C2F",
          darkBg: "#090D16",
        },
        charcoal: {
          DEFAULT: "#111512",
          secondary: "#555A56",
          muted: "#777C78",
          subtle: "#9CA19E",
        },
        border: {
          subtle: "#E7E5DE",
          active: "#063C2F",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        "soft-sm": "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "soft-md": "0 4px 6px -1px rgb(0 0 0 / 0.06)",
        "soft-lg": "0 10px 15px -3px rgb(0 0 0 / 0.08)",
        "soft-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        "colored-sm": "0 2px 4px 0 rgb(6 60 47 / 0.05)",
        "colored-md": "0 6px 12px -2px rgb(6 60 47 / 0.08)",
        "colored-lg": "0 12px 24px -4px rgb(6 60 47 / 0.1)",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
