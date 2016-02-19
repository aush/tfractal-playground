const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  entry: path.join(SRC_DIR, 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: [SRC_DIR],
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
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true,
    }),
    new WriteFilePlugin({
      test: /\.css$/,
    }),
  ],
  resolve: { extensions: ['', '.js', '.jsx', '.css', '.styl'] },
};
