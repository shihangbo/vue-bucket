import RouterLink from './components/router-link'
import RouterView from './components/router-view'

let Vue = null

export default function install(_Vue) {
  Vue = _Vue
  // 注册全局组件
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)

  // 将用户定义的router对象注册到new Vue（当前组件和他到所有子组件）
  Vue.mixin({
    beforeCreate() {
      // console.log('name',this.$options)
      if (this.$options.router) { // 根
        this._routerRoot = this
        this._router = this.$options.router
      } else { // 子组件
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
      // 所有组件拥有了 this._routerRoot 属性
      // console.log(this._routerRoot.$options.router)
      // console.log(this._routerRoot._router)
    }
  })
}