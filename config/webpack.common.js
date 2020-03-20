import path from 'path';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const entry = './client/src/index.jsx';

const output = {
	path: path.join(__dirname, '../dist/'),
	publicPath: '/'
}

const target = 'web';

const resolve = {
	extensions: ['.js', '.jsx'],
	modules: ['node_modules', '../client']
};

// const externals = [nodeExternals()];

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

const plugins = [
	new MiniCssExtractPlugin({
		filename: '[name]-[contenthash].css'
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
];

const bundle = {
	entry,
	output,
	target,
//	externals,
	resolve,
	module,
	plugins
};

export default bundle;