const {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
  addWebpackPlugin
} = require('customize-cra')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = override(
  process.env.REACT_APP_ENV === 'production' && addWebpackPlugin(new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true
      }
    }
  })),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src')
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#0C0C0C' },
    sourceMap: true
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true // 自动打包相关的样式 默认为 style:'css'
  })
)
