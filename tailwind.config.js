/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          1: '#9a9cea',
          2: '#a2b9ee',
          3: '#a2dcee',
          4: '#ffd074'
        }
      }
    }
  },
  plugins: [require('tailwindcss-primeui')]
}
