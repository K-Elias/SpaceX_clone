import { SourceMapDevToolPlugin, HotModuleReplacementPlugin } from 'webpack';
import webpackMerge from 'webpack-merge';

import commonConfig from './webpack.common';

export default webpackMerge(commonConfig, {
	mode: 'development',
	entry: [
		'./client/src/index.jsx',
		'webpack-hot-middleware/client?path=//localhost:4000/__webpack_hmr&reload=true'
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[id]-chunk.js'
	},
	devtool: 'inline-source-map',
	plugins: [
		new HotModuleReplacementPlugin({}),
		new SourceMapDevToolPlugin({ filename: '[file].map[query]' })
	]
});