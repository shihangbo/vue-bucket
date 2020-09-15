const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports={
  output:{
    filename:'[name].bundle.js',
    path:path.resolve(__dirname,'../dist')
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
  ]
}