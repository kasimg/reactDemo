const path = require('path');
// const webpack = require('webpack');
module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // 区分静态资源和url请求
    publicPath: '/public',
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        // node_modules中的js都已经过编译，不需要再次编译
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
};