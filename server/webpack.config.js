const webpack = require('webpack')
const path = require('path')
const StartServerPlugin = require('start-server-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
	mode: NODE_ENV,
	entry: ['webpack/hot/poll?1000', './src/index'],
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	target: 'node',
	externals: nodeExternals({ whitelist: ['webpack/hot/poll?1000'] }),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
		]
	},
	plugins: [
    new StartServerPlugin('server.js'),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
	],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'server.js'
	}
}
