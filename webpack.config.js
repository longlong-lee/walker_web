var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var common = [
  'angular',
  'angular-ui-router',
  'angular-resource',
  'angular-animate',
  'ng-file-upload',
  'angular-ui-bootstrap',
  './angular-notify.min.js'
];
module.exports = {
  context: path.join(__dirname, '/javascripts'),
  entry: {
    'lib/app': './app.js',
    'lib/common': common
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  resolve: {
    root: '.',
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /angular\.js$/, loader: "exports?window.angular" },
      { test: /\.html$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000', exclude: /node_modules/ }
    ]
  }
  // plugins: [
  //   new CommonsChunkPlugin("commons.chunk.js")
  // ],
};