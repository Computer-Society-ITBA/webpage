const TerserPlugin = require('terser-webpack-plugin');
const { whenProd } = require('@craco/craco');

module.exports = {
	webpack: {
		plugins: [
			...whenProd(
				() => [
					new TerserPlugin({
						extractComments: true,
						terserOptions: {
							compress: {
								drop_console: true,
								drop_debugger: true,
								sequences: true,
								dead_code: true,
								booleans: true,
								conditionals: true,
								unused: true,
								if_return: true,
								join_vars: true
							},
							mangle: true
						}
					})
					// new UglifyJsPlugin({
					// 	uglifyOptions: {
					// 		compress: {
					// 			warnings: false,
					// 			drop_debugger: true,
					// 			drop_console: true,
					// 			sequences: true,
					// 			dead_code: true,
					// 			conditionals: true,
					// 			booleans: true,
					// 			unused: true,
					// 			if_return: true,
					// 			join_vars: true
					// 		},
					// 		output: {
					// 			comments: false,
					// 			beautify: false,
					// 			indent_level: 0
					// 		},
					// 		mangle: true
					// 	},
					// 	sourceMap: false,
					// 	parallel: true
					// })
				],
				[]
			)
		]
	},
	style: {
		postcss: {
			pluginOptions: [require('tailwindcss'), require('autoprefixer')]
		}
	}
};
