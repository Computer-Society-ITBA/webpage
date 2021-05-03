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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
