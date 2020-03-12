import path from 'path';
import { SourceMapDevToolPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin'

const mode = process.env.NODE_ENV;

const entry = path.resolve(__dirname, 'src/index.js');

const output = {
  path: path.join(__dirname, 'dist'),
  filename: mode === 'production' ?
    '[name]-bundle-[hash].js' : '[name].js'
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
          },
        },
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          },
        },
        'file-loader',
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          },
        },
        'file-loader',
      ],
    }
  ]
};

const optimization = {
  minimize: mode === 'production',
  minimizer: [
    new TerserPlugin({
      parallel: true,
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  moduleIds: 'hashed',
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      default: false,
      vendors: false,
      vendor: {
        chunks: 'all',
        test: /node_modules/
      },
    },
  },
};

const plugins = [
  new CleanWebpackPlugin({}),
  new SourceMapDevToolPlugin({
    filename: '[name].js.map'
  }),
  new CompressionPlugin({}),
  new MiniCssExtractPlugin({
    filename: '[name].css',
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
  })
];

export default {
  mode,
  entry,
  output,
  resolve,
  module,
  optimization,
  plugins
};