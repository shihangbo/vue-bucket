import {observer} from './observer/index.js'
import {proxy, isObject} from './util/index'
import Watcher from './observer/watcher.js'

export function initState(vm) {
  let opts = vm.$options
  if(opts.data) {
    initData(vm)
  }
  if (opts.methods) {
    initMethods(vm)
  }
  if(opts.computed) {
    initComputed(vm)
  }
  if(opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  for(let key in data) {
    proxy(vm, '_data', key)
  }
  observer(vm._data)
}

function initMethods(vm) {

}

function initComputed(vm) {

}

function initWatch(vm, watch) {
  for(let key in watch) {
    const handler = watch[key]
    if(Array.isArray(handler)){
      for(let i=0;i<handler.length;i++){
        createWatcher(vm,key,handler[i])
      }
    } else{
      createWatcher(vm,key,handler)
    }
  }
}

function createWatcher(vm,key,handler,options){
  // 1.handler 格式化操作，目的获取 handler函数
  if(isObject(handler)){
    options = handler
    handler = handler.handler
  }
  if(typeof handler === 'string'){ // 获取methods中的方法
    // handler = vm[handler] // 源码
    handler = vm.$options.methods[handler]
  }
  // 2.实现
  return vm.$watch(key,handler,options)
}

export function stateMixin(Vue) {
  Vue.prototype.$watch = function(exprOrFn,cb,options) {
    //创建 用户watcher
    const vm = this
    options.user = true
    new Watcher(vm,exprOrFn,cb,options)
  }
}