import {mergeOptions} from '../util/index'
export function initGlobelAPI(Vue) {
  Vue.options = {}
  Vue.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin)
  }
  // 测试 Vue.mixin
  Vue.mixin({
    a:1,
    beforeCreate() {
      console.log('生命周期: beforeCreate Vue定义的')
    },
  })
  // Vue.mixin({
  //   b:2,
  //   beforeCreate() {
  //     console.log(2)
  //   }
  // })



  console.log('Vue.mixin合并策略(Vue自身的合并完成): ', Vue.options)
}