/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // <--- Note: just "tailwindcss", not "@tailwindcss/postcss"
    autoprefixer: {},
  },
};

export default config;