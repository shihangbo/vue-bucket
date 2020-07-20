import {mergeOptions} from '../util/index'

export default function initExtend(Vue) {
  // 创建子类，继承父类
  let cid = 0
  Vue.extend = function(extendOptions) {
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.cid = ++cid
    Sub.prototype = Object.create(this.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(this.options, extendOptions)
    // Sub.mixin = this.mixin
    // use
    // component
    // ...
    return Sub
  }
}