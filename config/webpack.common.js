import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

export default {
	entry: './client/src/index.jsx',
	output: {
		path: path.join(__dirname, '../dist'),
		publicPath: '/'
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx',
			'.html', '.css', '.less', '.sass', '.scss'],
		modules: ['node_modules', '../client']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
        test: /\.html$/,
        loader: 'html-loader'
      },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { esModule: true }
					},
					{
						loader: 'css-loader',
						options: { sourceMap: isDev }
					},
					{
						loader: 'resolve-url-loader',
						options: { removeCR: true, sourceMap: isDev }
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: isDev }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: isDev }
					}
				]
			},
			{
				test: /\.svg$/,
				use: '@svgr/webpack'
			},
			{
				test: /\.(png|jpe?g|gif|eot|ttf|otf|woff|woff2|ico)$/i,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({}),
		new MiniCssExtractPlugin({
			filename: '[name]-[contenthash].css',
			chunkFilename: '[id].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			hash: true,
			template: './client/public/index.html',
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
		})
	]
};
