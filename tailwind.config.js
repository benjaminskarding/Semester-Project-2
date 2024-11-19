export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./auth/**/*.html",
    "./listing/**/*.html",
    "./profile/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
        custom: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
