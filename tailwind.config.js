/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tiny: ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: { '1/2vh': '50vh' },
      colors: {
        cerulean: {
          50: '#effaff',
          100: '#def4ff',
          200: '#b6ebff',
          300: '#75deff',
          400: '#2ccfff',
          500: '#00bfff',
          600: '#0095d4',
          700: '#0076ab',
          800: '#00638d',
          900: '#065374',
          950: '#04344d',
        },
        hoki: {
          50: '#f3f7f8',
          100: '#e0eaed',
          200: '#c4d7dd',
          300: '#9bbbc5',
          400: '#608f9f',
          500: '#4f7b8b',
          600: '#456676',
          700: '#3c5562',
          800: '#374953',
          900: '#313f48',
          950: '#1d282f',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  important: '#root',
  plugins: [],
};
