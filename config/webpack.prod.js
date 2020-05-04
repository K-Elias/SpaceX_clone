import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import merge from 'webpack-merge';
import path from 'path';

import commonConfig from './webpack.common';

export default merge(commonConfig, {
	mode: 'production',
	output: {
		filename: '[name]-[contentHash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
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
				react: {
					test: /[\\/]node_modules[\\/]((react)*)[\\/]/,
					name: 'react',
					chunks: 'all'
				},
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'commons',
					chunks: 'all'
				}
			}
		}
	},
	plugins: [
		new CompressionPlugin({ cache: true })
	]
});
