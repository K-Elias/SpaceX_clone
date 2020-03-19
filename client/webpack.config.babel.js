import { SourceMapDevToolPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const mode = process.env.NODE_ENV;

const entry = path.resolve(__dirname, 'src/index.js');

const output = {
	path: path.join(__dirname, 'dist/'),
	publicPath: '/',
	filename: mode === 'production' ? '[name]-[contentHash].js' : '[name].js'
	// chunkFilename: '[name].[chunkhash].js'
};

const resolve = {
	extensions: ['.js', '.jsx'],
	modules: ['node_modules', 'src', 'assets']
};

const module = {
	rules: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		},
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						esModule: true
					}
				},
				'css-loader',
				'postcss-loader',
				'sass-loader'
			]
		},
		{
			test: /\.svg$/,
			use: '@svgr/webpack'
		},
		{
			test: /\.(png|jpe?g|gif|ico)$/,
			use: 'file-loader'
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: 'file-loader'
		}
	]
};

const devtool = mode === 'development' ? 'eval-source-map' : false;

const devServerOptions = {
	inline: false,
	contentBase: './dist',
	historyApiFallback: true
};

const devServer = mode === 'development' ? devServerOptions : {};

const minification = {
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
		new OptimizeCSSAssetsPlugin({})
	],
	moduleIds: 'hashed',
	runtimeChunk: 'single',
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
};

const optimization = mode === 'production' ? minification : {};

const dev_plugins = [
	new SourceMapDevToolPlugin({
		filename: '[name].js.map'
	})
];

const prod_plugins = [
	new CleanWebpackPlugin({}),
	new CompressionPlugin({ cache: true })
];

const plugins_sup = mode === 'production' ? prod_plugins : dev_plugins;

const plugins = [
	...plugins_sup,
	new MiniCssExtractPlugin({
		filename: mode === 'production' ? '[name]-[contenthash].css' : '[name].css'
	}),
	new HtmlWebpackPlugin({
		hash: true,
		template: './public/index.html',
		filename: 'index.html',
		minify: {
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			useShortDoctype: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true
		},
		scriptLoading: 'defer'
	}),
	new ScriptExtHtmlWebpackPlugin({
		defaultAttribute: 'defer'
	}),
	new Dotenv({
		path: path.resolve(__dirname, './.env'),
		systemvars: true
	})
];

export default {
	mode,
	entry,
	output,
	resolve,
	devtool,
	devServer,
	module,
	optimization,
	plugins
};
