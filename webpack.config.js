const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PathTransform = require('./webpack/plugins/pathTransform');


module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
    ]
  },
  //代码分离，优化，如将下面的 jqeury 抽离为公共文件
  optimization: {
    splitChunks: {
      filename: 'common.js', 
      chunks: 'all'
    }
  },

  plugins: [
    new ExtractTextPlugin('[name][hash].css'),
    new CleanWebpackPlugin('dist'),   //清除旧文件
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',   //通过 import require 自动引入模块
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      // 环境差将
      'env': JSON.stringify('development')
    }),
    new PathTransform(),
  ]
};