import RouterLink from './components/router-link'
import RouterView from './components/router-view'

let Vue = null

export default function install(_Vue) {
  Vue = _Vue
  // 注册全局组件
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
  console.log('全局组件注册完成: router-link, router-view')

  // 将用户定义的router对象注册到new Vue（当前组件和他到所有子组件）
  Vue.mixin({
    beforeCreate() {
      // console.log('name',this.$options)
      if (this.$options.router) { // 根
        this._routerRoot = this
        this._router = this.$options.router
        
        // 调用插件的init方法 - 根据用户的配置，初始化路由实例，即做出一个映射表，当用户访问url时刷新对应组件！
        console.log('--路由初始化开始')
        this._router.init(this)
        console.log('--路由初始化完成，映射表生成')

        // 组件渲染
        Vue.util.defineReactive(this,'_route',this._router.history.current)
        console.log('$$将current属性定义成响应式数据', this._route)

      } else { // 子组件
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
      // 所有组件拥有了 this._routerRoot 属性
      // console.log(this._routerRoot.$options.router)
      // console.log(this._routerRoot._router)
    }
  })
  // 定义$route
  Object.defineProperty(Vue.prototype,'$route',{
    get() {
      return this._routerRoot && this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype,'$router',{
    get() {
      return this._routerRoot && this._routerRoot._router
    }
  })
}