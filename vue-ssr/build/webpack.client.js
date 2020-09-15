const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports=merge(base, {
  mode:'development',
  entry:{
    client:path.resolve(__dirname,'../src/client-entry.js'),
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.client.html'),
      filename:'index.client.html',
      minify:false
    }),
    // new VueSSRClientPlugin()
  ]
})