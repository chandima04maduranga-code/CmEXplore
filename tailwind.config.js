/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 12px 32px rgba(190, 46, 214, 0.20)',
      },
      colors: {
        brand: {
          50: '#f9f6fb',
          100: '#f3e8ff',
          200: '#ead4f4',
          300: '#d580e4',
          400: '#e879f9',
          500: '#be2ed6',
          600: '#a21caf',
          700: '#8e1fa5',
          800: '#6f157f',
          900: '#48104f',
        },
      },
    },
  },
  plugins: [],
}
