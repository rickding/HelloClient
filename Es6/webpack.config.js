const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devtool:'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use:[
          'babel-loader'
        ]
      }, {
        test: /\.(sass|scss|css)/,
        use: [
        "style-loader",
        "css-loader",
        "resolve-url-loader",
        "sass-loader?sourceMap"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'React with ES6',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config;