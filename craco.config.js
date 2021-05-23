// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
