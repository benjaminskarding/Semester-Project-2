export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './auth/**/*.html',
    './listing/**/*.html',
    './profile/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      screens: {
        'header-md': '800px',
        'tablet-screen': { max: '640px' },
      },
    },
  },
  plugins: [],
};
