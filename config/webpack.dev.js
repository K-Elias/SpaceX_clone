import { SourceMapDevToolPlugin, HotModuleReplacementPlugin } from 'webpack';
import merge from 'webpack-merge';
import 'dotenv/config';

import commonConfig from './webpack.common';

const { PORT } = process.env;

export default merge(commonConfig, {
	mode: 'development',
	entry: [
		'./client/src/App.jsx',
		`webpack-hot-middleware/client?path=//localhost:${PORT}/__webpack_hmr&reload=true`
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[id]-chunk.js'
	},
	devtool: 'eval-source-map',
	plugins: [
		new HotModuleReplacementPlugin(),
		new SourceMapDevToolPlugin({
			filename: '[file].map[query]'
		})
	]
});