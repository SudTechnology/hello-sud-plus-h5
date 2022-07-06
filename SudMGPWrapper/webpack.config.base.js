const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'SudMGPWrapper'),
    library: {
      name: 'SudMGPWrapper',
      type: 'umd'
    },
    globalObject: 'this'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      SudMGP: path.resolve(__dirname, './src/SudMGP'),
      SudMGPWrapper: path.resolve(__dirname, './src/SudMGPWrapper')
    }
  }
}

module.exports = base
