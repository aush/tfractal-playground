const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      path.join(__dirname, 'devServer', 'index'),
      'webpack-hot-middleware/client?reload=true',
    ],
    vendor: ['babel-polyfill', 'color', 'lodash', 'material-ui', 'react', 'react-4color-picker', 'react-center', 'react-css-modules', 'react-dom', 'react-rectangle', 'react-redux', 'react-stack', 'react-tfractal', 'recompose', 'redux'],
  },
  output: {
    path: path.join(__dirname, 'devServer'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    outputPath: path.join(__dirname, 'devServer'),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
    }),
    new WriteFilePlugin({
      test: /\.css$/,
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'devServer'),
      ],
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus'),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
      test: /\.png$/,
      loader: 'url?limit=25000',
    }],
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.css', '.styl'],
  },
};
