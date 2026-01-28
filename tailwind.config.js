/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-epilogue)', 'sans-serif'], // Using Epilogue as primary sans for now
        serif: ['var(--font-lora)', 'serif'],
        display: ['var(--font-epilogue)', 'sans-serif'],
        accent: ['var(--font-instrument)', 'serif'],
      },
      colors: {
        primary: "#9d7de8",
        "background-light": "#f6f6f8",
        "background-dark": "#161220",
        surface: "#ffffff",
        brand: {
          purple: '#3b1c59',  // The deep plum text/machine color
          light: '#efeaf5',   // A very light purple for backgrounds
          teal: '#56a7a7',    // The scissors/quilt block teal
          gold: '#cfae46',    // The table/scissors gold
          pink: '#d65db1',    // The heart/quilt pink
          beige: '#d9cfbd',   // The tape measure beige
        }
      },
      boxShadow: {
        'plush': '0 20px 40px -12px rgba(0, 0, 0, 0.06)',
        'plush-sm': '0 10px 20px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};