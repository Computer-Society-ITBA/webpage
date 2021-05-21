module.exports = {
  purge: {
    content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      whitelistPatterns: [/^bg-/]
     }
  },
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
        'h5': '1.25rem',
        'h1-sm': '3rem',
        'h2-sm': '2.25rem',
        'h3-sm': '1.75rem',
        'h4-sm': '1.5rem',
        'h5-sm': '1.25rem'
      },
      lineHeight: {
        'sm': '1rem',
        'base': '1.25rem',
        'h1': '4.25rem',
        'h2': '3.25rem',
        'h3': '2.25rem',
        'h4': '1.75rem',
        'h5': '1.5rem',
        'h1-sm': '3.25rem',
        'h2-sm': '2.5rem',
        'h3-sm': '2rem',
        'h4-sm': '1.75rem',
        'h5-sm': '1.5rem',
      },
      margin: {
        '-75_': '-75%',
        '-50_': '-50%',
        '-40_': '-40%',
        '-33_': '-33%',
        '-25_': '-25%'
      },
      height: {
        'screen-half': '50vh',
        'screen-3/4': '75vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
