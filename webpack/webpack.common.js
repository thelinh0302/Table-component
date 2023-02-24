const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const configPath = '../config';
const paths = require(`${configPath}/paths`);
const getClientEnvironment = require(`${configPath}/env`);

const { appIndexTsx, publicUrlOrPath, appHtml } = paths;

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrlOrPath);

module.exports = {
  entry: appIndexTsx,
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|js|ts)/,
        enforce: 'pre',
        loader: 'import-glob'
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['lodash'],
          presets: [
            ['@babel/preset-env', { modules: false, targets: { node: 4 } }],
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  resolve: {
    alias: {
      '@/static': path.resolve(__dirname, '../public/static'),
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    //   fix: true,
    //   emitWarning: process.env.NODE_ENV !== 'production'
    // }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // new WebpackManifestPlugin(),
    new LodashModuleReplacementPlugin()
    // new webpack.optimize.UglifyJsPlugin({}),
  ]
};
