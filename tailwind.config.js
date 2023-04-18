/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      tiny: ['0.6rem', { lineHeight: '0.75rem' }],
    },
    extend: {},
  },
  important: '#root',
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
