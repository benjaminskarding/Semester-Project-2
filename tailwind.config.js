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
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        pageTitle: ['2.5rem', { lineHeight: '3rem', fontWeight: '500' }], // 40px, medium weight
        bigHeader: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '500' }], // 30px, medium weight
      },
      screens: {
        'header-md': '800px',
        'tablet-screen': { max: '640px' },
        'footer-md': { max: '900px' },
      },
    },
  },
  plugins: [],
};
