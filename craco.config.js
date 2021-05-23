const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  webpack: {
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 0
          },
          mangle: true
        },
        sourceMap: false,
        parallel: true,
      })
    ],
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  }
}