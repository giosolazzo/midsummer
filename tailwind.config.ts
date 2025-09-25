// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind v4 can infer content, leaving this out is fine.
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        navy: "var(--navy)",
        dark1: "var(--dark1)",
        dark2: "var(--dark2)",
        black: "var(--black)",
      },
      borderRadius: {
        pill: "9999px",
        xl2: "1rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [],
};
export default config;
