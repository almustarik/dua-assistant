/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Arial', 'sans-serif'], // You might want to add a proper Arabic font
      },
    },
  },
  plugins: [],
};