import initMixin from './mixin'
import initAssetRegisters from './assets'
import {ASSETS_TYPE} from './const'
import initExtend from './extend'
import initUse from './use'

export function initGlobelAPI(Vue) {
  Vue.options = {}
  // 初始化 Vue.mixin
  initMixin(Vue)
  
  // 初始化全局组件 指令 过滤器
  ASSETS_TYPE.forEach(type => {
    Vue.options[type+'s'] = {}
  })

  Vue.options._base = Vue
  initExtend(Vue)
  initAssetRegisters(Vue)

  initUse(Vue)

  // 测试 Vue.mixin
  // Vue.mixin({
  //   a:1,
  //   beforeCreate() {
  //     console.log('生命周期: beforeCreate Vue定义的')
  //   },
  // })
  // Vue.mixin({
  //   b:2,
  //   beforeCreate() {
  //     console.log(2)
  //   }
  // })



  console.log('Vue.mixin合并策略(Vue自身的合并完成): ', Vue.options)
}