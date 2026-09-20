/** @type {import('tailwindcss').Config} */
module.exports = {
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
        surface: {
          base: "#FAF9F6",
          secondary: "#F4F3EF",
          card: "#FFFFFF",
          footer: "#F3F2EE",
          dark: "#063C2F",
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
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
