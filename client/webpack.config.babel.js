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
	filename: mode === 'production' ? '[name]-bundle-[hash].js' : '[name].js',
	chunkFilename:
		mode === 'production' ? '[name].chunkhash.bundle.js' : '[name].js'
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
			use: ['@svgr/webpack']
		},
		{
			test: /\.(png|jpe?g|gif|ico)$/,
			use: ['url-loader?limit=8192', 'file-loader']
		},
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: ['url-loader?limit=8192', 'file-loader']
		}
	]
};

const node = {
	fs: 'empty'
};

const devtool = mode === 'development' ? 'eval-source-map' : false;

const comments = {
	extractComments: false,
	terserOptions: {
		output: {
			comments: false
		}
	}
};

const showComments = mode === 'production' ? comments : {};

const optimization = {
	minimizer: [
		new TerserPlugin({
			...showComments,
			sourceMap: mode === 'development',
			parallel: true
		}),
		new OptimizeCSSAssetsPlugin({})
	],
	moduleIds: 'hashed',
	runtimeChunk: 'single',
	splitChunks: {
		chunks: 'all',
		cacheGroups: {
			vendor: {
				test: /node_modules/,
				name: 'vendor',
				chunks: 'all',
				priority: 20
			},
			commons: {
				name: 'commons',
				minChunks: 2,
				chunks: 'async',
				priority: 10,
				reuseExistingChunk: true,
				enforce: true
			}
		}
	}
};

const dev_plugins = [
	new SourceMapDevToolPlugin({
		filename: '[name].js.map',
		exclude: ['vendor.js']
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
		filename: mode === 'production' ? '[name]-[contenthash].css' : '[name].css',
		chunkFilename: '[id].css'
	}),
	new HtmlWebpackPlugin({
		hash: true,
		template: './public/index.html',
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
		}
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
	node,
	module,
	optimization,
	plugins
};
