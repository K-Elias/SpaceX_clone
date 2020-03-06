import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const mode = process.env.NODE_ENV;

const entry = './src/index.js';

const context = path.resolve(__dirname, 'src/');

const output = {
  path: path.join(__dirname, './dist'),
  filename: mode === 'production' ? '[name]-bundle-[hash].js' : '[name].js'
};

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
  modules: ['node_modules', 'src']
};

const module = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use {
        loader: 'babel-loader'
      }
    }
  ]
};

const optimization = {
  splitChunks: {
    chunks: 'all',
    name: mode === 'development' ? true : false
  }
};

const plugins = [
  new CleanWebpackPlugin(),
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
  })
];

export default {
  mode,
  context,
  entry,
  output,
  resolve,
  module,
  optimization,
  plugins,
};