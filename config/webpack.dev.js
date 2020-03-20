import { SourceMapDevToolPlugin } from 'webpack';
import commonConfig from './webpack.common';
import merge from 'webpack-merge';

const mode = 'development';

const entry = ['./client/src/index.jsx', 'webpack-hot-middleware/client']

const output = {
	filename: '[name].js',
	chunkFilename: '[id]-chunk.js'
};

const devtool = 'eval-source-map';

const devServer = {
	contentBase: './client/public',
	historyApiFallback: true
};

const plugins = [
	new SourceMapDevToolPlugin({
		filename: '[name].js.map'
	})
];

const bundle = merge(commonConfig, {
	mode,
	entry,
	output,
	devtool,
	devServer,
	plugins
});

export default bundle;