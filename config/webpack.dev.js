import { SourceMapDevToolPlugin } from 'webpack';
import commonConfig from './webpack.common';
import merge from 'webpack-merge';

export default merge(commonConfig, {
	mode: 'development',
	entry: ['./client/src/index.jsx', 'webpack-hot-middleware/client'],
	output: {
		filename: '[name].js',
		chunkFilename: '[id]-chunk.js'
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './client/public',
		historyApiFallback: true,
		hot: true
	},
	plugins: [
		new SourceMapDevToolPlugin({
			filename: '[name].js.map'
		})
	]
});