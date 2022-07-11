const { merge } = require("webpack-merge")
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")

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
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          {
            noErrorOnMissing: false, // 默认false，不会对丢失的文件产生错误
            force: false, // 默认false，覆盖已经存在的文件
            priority: 0, // 允许指定复制具有相同目标名称的文件的优先级
            from: path.resolve(__dirname, "./package.json"), // 拷贝来源
            to: path.resolve(__dirname, "lib/") // 拷贝到的位置
          }
        ]
      }
    )
  ]
}
])
