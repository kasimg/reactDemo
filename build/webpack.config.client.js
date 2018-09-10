const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

//  第二个参数会覆盖第一个参数
const config = webpackMerge(baseConfig, {
    entry: {
        // 将所有js打包成一个文件
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
    },
    plugins: [
        new HTMLPlugin({
            // 最终生成的html会以此处的template.html作为模板，内容是template内容，且会插入js文件
            template: path.join(__dirname, '../client/template.html'),
        })
    ]
});

if (isDev) {
    config.entry = {
      app: [
          'react-hot-loader/patch',
          path.join(__dirname, '../client/app.js')
      ]
    };
    config.devServer = {
        // 任何ip可访问
        host: '0.0.0.0',
        port: '8888',
        // dev-server 根目录时dist，访问时应该是localhost:8888/filename.js这种形式
        // 但是publicPath中配置了/public，所以无法获取文件
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        // 错误提示
        overlay: {
            // 只在error时提示
            errors: true
        },
        // 与上面一致，所有静态路径都通过/public
        publicPath: '/public',
        // 所有404请求都返回这个页面
        historyApiFallback: {
            index: '/public/index.html'
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = config;