const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  entry:path.resolve(__dirname,'src/app.js'),
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['vue-style-loader','css-loader']
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      },
      {
        test:/\.vue$/,
        use:'vue-loader'
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'public/index.client.html'),
      filename:'index.client.html',
      minify:false
    })
  ]
}