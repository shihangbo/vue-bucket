const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist2')
  },
  // resolve: {
  //   modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html')
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {test:/\.vue$/,use:'vue-loader'},
    ]
  },
  mode: 'development',
  devServer: {
    port:3000,
    host:true,
    open:true,
    host:'localhost',
    contentBase: path.join(__dirname, 'dist2'),
  }
}