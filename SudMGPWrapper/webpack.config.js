const { merge } = require("webpack-merge")
const path = require('path')

const webpackBase = require('./webpack.config.base')

module.exports = merge([webpackBase, {
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: {
      name: 'SudMGPWrapper',
      type: 'umd'
    },
    globalObject: 'this'
  }
}])
