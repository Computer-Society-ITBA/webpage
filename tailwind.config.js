module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand_primary': '#FFA300',
        'brand_secondary': '#00B5E2',
        'brand_tertiary': '#75787B',
        'typography_primary': '#000000'
      },
      fontFamily: {
        'text': ['Roboto', 'sans-serif'],
        'highlight': ['Montserrat', 'sans-serif'] 
      },
      fontSize: {
        'sm': '0.75rem',
        'base': '1rem',
        'h1': '3rem',
        'h2': '2.5rem',
        'h3': '2rem',
        'h4': '1.5rem',
        'h5': '1.25rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
