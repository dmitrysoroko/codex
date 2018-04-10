const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  mode: NODE_ENV,
  entry: `${APP_DIR}/index.js`,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
                presets: [ 'env', 'react', 'react-hmre' ]
							}
						}
					]
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: '[name].[ext]?[hash]'
					}
				},
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
			]
		},
}
