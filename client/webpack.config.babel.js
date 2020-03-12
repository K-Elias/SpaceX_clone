import path from 'path';
import { SourceMapDevToolPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const mode = process.env.NODE_ENV;

const entry = path.resolve(__dirname, 'src/index.js');

const output = {
  path: path.join(__dirname, 'dist'),
  filename: mode === 'production' ?
    '[name]-bundle-[hash].js' : '[name].js',
  chunkFilename: mode === 'production' ?
    '[name].chunkhash.bundle.js' : '[name].js'
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

const devtool = mode === 'development' ?
  'eval-source-map' : false;

const showComments = mode === 'production' ? {
  extractComments: false,
  terserOptions: {
    output: {
      comments: false,
    }
  }
} : {};

const optimization = {
  minimize: true,
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
    maxInitialRequests: 20,
    maxAsyncRequests: 20,
    minSize: 40,
    cacheGroups: {
      default: false,
      vendors: false,
      vendor: {
        test: /node_modules/,
        name: 'vendor',
        priority: 20,
        chunks: 'all'
      },
      common: {
        test: /node_modules/,
        name: 'common',
        minChunks: 2,
        chunks: 'async',
        priority: 10,
        reuseExistingChunk: true
      }
    }
  }
};

const prod_plugins = (mode === 'production' ? [
  new CleanWebpackPlugin({}),
  new CompressionPlugin({
    cache: true
  }),
] : [
  new SourceMapDevToolPlugin({
    filename: '[name].js.map',
    exclude: ['vendor.js']
  })
]);

const plugins = [
  ...prod_plugins,
  new MiniCssExtractPlugin({
    filename: mode === 'production' ?
      '[name]-[contenthash].css' : '[name].css',
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
  devtool,
  module,
  optimization,
  plugins
};