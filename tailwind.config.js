/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fffbe6', // Lightest shade
          300: '#f6e489',
          500: '#f2d923', // Base color
          700: '#e7c000',
          900: '#b19500', // Darkest shade
        }
      }
    },
  },
  plugins: [],
}

