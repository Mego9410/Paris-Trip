import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--color-void)",
        smoke: "var(--color-smoke)",
        gold: "var(--color-gold)",
        champagne: "var(--color-champagne)",
        parisWarm: "var(--color-paris-warm)",
        sky: "var(--color-sky)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        extreme: "0.4em",
        display: "0.6em",
        ultra: "0.5em",
      },
    },
  },
  plugins: [],
};

export default config;
