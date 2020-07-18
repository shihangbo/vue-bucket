import {createElement,createTextNode} from './vdom/create-element'

export function renderMixin(Vue) {
  Vue.prototype._c = function() {
    return createElement(...arguments)
  }
  Vue.prototype._v = function(text) {
    return createTextNode(text)
  }
  Vue.prototype._s = function(val) {
    return val == null?'':(typeof val === 'object'?JSON.stringify(val):val)
  }
  Vue.prototype._render = function() {
    let vm = this
    const { render } = vm.$options
    let vnode = render.call(vm)
    console.log('执行render方法，生成vnode: ', vnode)
    return vnode;
  }
}