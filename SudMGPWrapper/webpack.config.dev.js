const path = require('path')
const { merge } = require("webpack-merge")
const webpackBase = require('./webpack.config.base')
module.exports = merge([webpackBase, {
  plugins: [
    ...webpackBase.plugins
  ],
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 9001,
    hot: true
    // https: true,
  }
}])
