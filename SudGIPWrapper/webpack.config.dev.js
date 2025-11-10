const path = require('path')
const { merge } = require("webpack-merge")
const webpackBase = require('./webpack.config.base')
module.exports = merge([webpackBase, {
  plugins: [
    ...webpackBase.plugins
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'SudGIPWrapper'),
    library: {
      name: 'SudGIPWrapper',
      type: 'umd'
    },
    globalObject: 'this'
  }
  // devServer: {
  //   static: path.join(__dirname, './dist'),
  //   compress: true,
  //   port: 9001,
  //   hot: true
  //   // https: true,
  // }
}])
