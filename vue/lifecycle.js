import Watcher from './observer/watcher'
import {patch} from './vdom/patch'

export function mountComponent(vm,el) {
  const options = vm.$options
  vm.$el = el

  // 挂载前
  callHook(vm, 'beforeMount')
  // 渲染页面
  let updateComponent = () => {
    vm._update(vm._render())
  }
  // 渲染Watcher
  new Watcher(vm, updateComponent, ()=>{}, true) //渲染 watcher
  // 挂载后
  callHook(vm, 'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode) {
    let vm = this
    let el = vm.$el
    // 第一版 直接渲染页面
    // let node = document.createDocumentFragment()
    // let firstChild;
    // while(firstChild = el.firstChild) {
    //   node.appendChild(firstChild)
    // }
    // compiler(node, vm)
    // el.appendChild(node)
  
    // 第二版 通过diff优化渲染
    // let preVnode = vm.preVnode
    // if (!preVnode) {
    //   vm.preVnode = vnode
    //   render(vnode, el)
    // } else {
    //   vm.$el = patch(preVnode, vnode)
    // }
    
    // 第三版 源码版
    vm.$el = patch(vm.$el, vnode)
  }
}

export function callHook(vm,hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    handlers.forEach(fn => {
      fn.call(vm)
    })
  }
}