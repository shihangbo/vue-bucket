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
    initComputed(vm, opts.computed)
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

function initComputed(vm, computed) {
  const watchers = vm._computedWatchers = {}
  for(let key in computed){
    const userDef = computed[key]
    const getter = typeof userDef==='function'?userDef:userDef.get
    // 1.定义计算属性
    // lazy为计算属性watcher标识，默认不执行getter
    watchers[key] = new Watcher(vm,getter,()=>{},{lazy:true})
    // 2.将计算属性定义到vm实例上，即vm.fullName进行取值
    defineComputed(vm,key,userDef)
  }
}
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get:()=>{},
  set:()=>{}
}
function defineComputed(target,key,userDef){
  if(typeof userDef === 'function'){
    sharedPropertyDefinition.get = createComputedGetter(key)
  }else{
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = userDef.set || function(){}
  }
  Object.defineProperty(target,key,sharedPropertyDefinition)
}
// 做缓存
function createComputedGetter(key){
  return function(){
    let watcher = this._computedWatchers[key]
    if(watcher.dirty){ // dirty为true的时候进行取值
      watcher.evaluate()
    }
    return watcher.value
  }
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