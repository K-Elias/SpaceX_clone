import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import commonConfig from './webpack.common';

export default webpackMerge(commonConfig, {
	mode: 'production',
	output: {
		filename: '[name]-[contentHash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.jsx?$/,
				extractComments: false,
				terserOptions: {
					output: {
						comments: false
					}
				},
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin()
		],
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'commons',
					chunks: 'all'
				}
			}
		}
	},
	plugins: [
		new CompressionPlugin({ cache: true }),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
});
