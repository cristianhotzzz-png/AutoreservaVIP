/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        verde: { DEFAULT: "#0f3d2e", claro: "#1d5c45", fundo: "#eef3ef" },
        ouro: { DEFAULT: "#e2a912", escuro: "#b88300" },
        grafite: "#2b2f2d",
      },
      fontFamily: { sans: ["var(--font-main)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
