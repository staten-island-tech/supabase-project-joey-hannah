/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
      colors: {
        plum: '#3c1b43',
        lilac: '#ac9fbb',
        cream: '#fdf0d5',
        scarlet: '#ad2e24',
        crimson: '#81171b',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans'],
        title: ['Aoboshi One', 'title'],
      },
    },
  },
  plugins: { tailwindcss: {}, autoprefixer: {} },
}
