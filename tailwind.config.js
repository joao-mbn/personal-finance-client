/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tiny: ['0.625rem', { lineHeight: '0.75rem' }],
      },
      colors: {
        cerulean: {
          50: '#f0f9ff',
          100: '#e1f1fd',
          200: '#bbe5fc',
          300: '#80cff9',
          400: '#3cb8f4',
          500: '#13a4ec',
          600: '#067fc3',
          700: '#06659e',
          800: '#0a5582',
          900: '#0e476c',
          950: '#092e48',
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
