module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand_primary': '#F67C01',
        'brand_secondary': '#FFB200',
        'brand_tertiary': '#75787B',
        'typography_primary': '#212121'
      },
      fontFamily: {
        'text': ['Roboto', 'sans-serif'],
        'highlight': ['Montserrat', 'sans-serif'] 
      },
      fontSize: {
        'sm': '0.75rem',
        'base': '1rem',
        'h1': '4rem',
        'h2': '3rem',
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
