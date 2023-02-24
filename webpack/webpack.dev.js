process.env.NODE_ENV = 'development';

const { merge } = require('webpack-merge');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const common = require('./webpack.common.js');

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: cssRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: sassRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    devMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        publicPath: false
      }
    },
    host,
    hot: true,
    port: PORT,
    historyApiFallback: true,
    onAfterSetupMiddleware: () => {
      openBrowser && openBrowser(`http://127.0.0.1:${PORT}/`);
    },
    onListening: function () {
      console.log('Listening on port:', PORT);
    }
  },
  output: {
    path: paths.appBuild,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: '[name].js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: '[name].js',
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
  performance: {
    maxEntrypointSize: 800000
  }
});
