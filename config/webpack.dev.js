import { SourceMapDevToolPlugin, HotModuleReplacementPlugin } from 'webpack';
import commonConfig from './webpack.common';
import merge from 'webpack-merge';

export default merge(commonConfig, {
	mode: 'development',
	entry: ['./client/src/App.jsx', 'webpack-hot-middleware/client'],
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