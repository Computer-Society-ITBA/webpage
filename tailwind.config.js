module.exports = {
  purge: {
    content:['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [/^bg-/]
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
        'highlight': '5rem',
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
        'highlight': '5.5rem',
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
        'screen-third': '33vh',
        'screen-half': '50vh',
        'screen-3/4': '75vh',
        '1/12': '8.333%',
        '2/12': '16.66%',
        '3/12': '25%',
        '4/12': '33.333%',
        '5/12': '41.666%',
        '6/12': '50%',
        '7/12': '58.333%',
        '8/12': '66.666%',
        '9/12': '75%',
        '10/12': '83.333%',
        '11/12': '91.666%'
      },
      width: {
        '2/10': '20%'
      }
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
    }
  },
  plugins: [],
}
