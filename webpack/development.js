var merge = require('webpack-merge');

var webpackBase = require('./webpack.base.js');
var plugins = require('./plugins');

module.exports = merge(webpackBase, {
  devtool: 'source-map',
  plugins: plugins.develop,
  devServer: {
    port: 8081,
    headers: { "Access-Control-Allow-Origin": "*" }
  }
});
