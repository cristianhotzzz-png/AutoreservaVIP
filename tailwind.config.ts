import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: "#17561f", deep: "#0d3513", soft: "#e8f0e4" },
        gold: { DEFAULT: "#f6c619", deep: "#c99a00" },
        asphalt: "#4a4d50",
      },
      fontFamily: { display: ["var(--f-display)"], sans: ["var(--f-body)"] },
    },
  },
} satisfies Config;
