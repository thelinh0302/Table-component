process.env.NODE_ENV = 'production';
const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageminWebpack = require('image-minimizer-webpack-plugin');
const paths = require('../config/paths');
const common = require('./webpack.common.js');

// Source maps are resource heavy and can cause out of memory issue for large source files.

const dirs = fs.readdirSync(paths.appPublic);

const copyPluginPatterns = dirs
  .filter(dir => dir !== 'index.html')
  .map(dir => {
    return {
      from: dir,
      to: '',
      context: path.resolve('public')
    };
  });

copyPluginPatterns.push({
  from: path.resolve(paths.appPublic, 'static'),
  to: path.resolve(paths.appBuild, 'static'),
  toType: 'dir'
});

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[contenthash:6].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyPluginPatterns
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:6].css',
      chunkFilename: 'static/css/[name].[contenthash:6].chunk.css'
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/
    }),
    new webpack.ProgressPlugin({
      modulesCount: 5000
    })
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[contenthash:6].js',
    chunkFilename: 'static/js/[name].[contenthash:6].chunk.js',
    publicPath: '/',
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false
    }
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          // Added for profiling in devtools
          // keep_classnames: isEnvProductionProfile,
          // keep_fnames: isEnvProductionProfile,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            // eslint-disable-next-line camelcase
            ascii_only: true
          }
        }
      }),
      // This is only used in production mode
      new CssMinimizerPlugin(),
      new ImageminWebpack({
        severityError: 'warning', // Ignore errors on corrupted images
        minimizerOptions: {
          plugins: ['gifsicle']
        },
        // Disable `loader`
        loader: false
      })
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
});
