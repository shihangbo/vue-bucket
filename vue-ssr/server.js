const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const Router = require('@koa/router')
const fs = require('fs')
let app = new Koa()
let router = new Router()

// 第一版
// let vm = new Vue({
//   data(){
//     return {
//       name: 'watson'
//     }
//   },
//   template:'<div>{{name}}</div>'
// })
// const template = fs.readFileSync('./temp.html', 'utf-8')
// let render = VueServerRenderer.createRenderer({
//   template
// })

// 第二版
// 服务端渲染出html
const serverBundle = fs.readFileSync('./dist/server.bundle.js','utf-8')
const template = fs.readFileSync('./dist/index.ssr.html','utf-8')
let render = VueServerRenderer.createBundleRenderer(serverBundle,{
  template
})
// 客户端激活 注入客户端script + koa-static
const static = require('koa-static')
const path = require('path')

router.get('/', async (ctx)=>{
  ctx.body = await new Promise((resolve,reject)=>{
    render.renderToString((err,html)=>{
      resolve(html)
    })
  })
})
router.get('/bar', async (ctx)=>{
  ctx.body = await new Promise((resolve,reject)=>{
    render.renderToString((err,html)=>{
      resolve(html)
    })
  })
})
app.use(static(path.resolve(__dirname, 'dist')))
app.use(router.routes())

app.listen(3000)