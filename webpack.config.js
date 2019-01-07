const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
	entry: ['./src/app.js', './src/scss/app.scss'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					// use: ['css-loader', 'sass-loader']
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			},
			{
				test: /\.(html|css)$/,
				loader: "raw-loader"
			}
		]
	},
	watch: argv.mode === 'development' ? true : false,
	plugins: [
		new ExtractTextPlugin({
			filename: "/styles.css"
		}),
		new CopyWebpackPlugin([
			{ from: __dirname + '/src/index.html', to: __dirname + '/build' },
			{ from: __dirname + '/src/assets/**/*', to: __dirname + '/build/assets/', context: 'src/assets' }
		])
	]
});