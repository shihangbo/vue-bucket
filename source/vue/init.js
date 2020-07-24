import {initState} from './state.js'
import {compilerToFunction} from './compiler/index.js'
import {mountComponent, callHook} from './lifecycle'
import {mergeOptions} from './util/index'
import {nextTick} from './util/next-tick'
export function initMixin(Vue) {
  // 初始化流程
  Vue.prototype._init = function(options) {
    const vm = this

    // 实例继承Vue的options属性
    vm.$options = mergeOptions(vm.constructor.options, options, 222)
    console.log('Vue.mixin合并策略(vm实例属性合并完成): ',  vm.$options)
    
    callHook(vm, 'beforeCreate')
    // 一、MVVM原理 数据劫持 Object.defineProperty() - 数据变化驱动视图更新
    initState(vm)
    callHook(vm, 'created')


    // 二、模版编译
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }

  }
  
  Vue.prototype.$mount = function(el) {
    let vm = this
    const options = vm.$options
    el = vm.$el = query(el)
    // 模版的选择与编译
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      // 将template转化成 render方法，以便后续进行dom diff
      const render = compilerToFunction(template)
      options.render = render
    }
    // 三、初始化渲染流程
    mountComponent(vm,el)
    // function updateComponent() {
    //   vm._update(vm._render())
    // }
    // new Watcher(vm, updateComponent, ()=>{}, true) //渲染 watcher
  }

  Vue.prototype.$nextTick = nextTick
}

function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  }
  return el
}