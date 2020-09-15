const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')
const base = require('./webpack.base')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports=merge(base, {
  mode:'development',
  entry:{
    server:path.resolve(__dirname,'../src/server-entry.js'),
  },
  target: 'node',
  output:{
    libraryTarget:'commonjs2'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.ssr.html'),
      filename:'index.ssr.html',
      minify:false,
      excludeChunks:['server']
    }),
    // new VueSSRServerPlugin()
  ]
})