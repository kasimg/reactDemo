const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    entry: {
        // 将所有js打包成一个文件
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2'
    },
});