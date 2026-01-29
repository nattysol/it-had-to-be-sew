import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 1. Scan these folders for classes
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Safety fallback
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#3b1c59',  // Logo Deep Plum
          light: '#efeaf5',   // Logo Light Background
          teal: '#56a7a7',    // Logo Teal
          gold: '#cfae46',    // Logo Gold
          pink: '#d65db1',    // Logo Pink
        }
      },
      fontFamily: {
        // Fallbacks included to prevent font-loading layout shifts
        serif: ['var(--font-serif)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;