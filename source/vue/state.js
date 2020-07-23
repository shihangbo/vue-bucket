import {observer} from './observer/index.js'
import {proxy} from './util/index'

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

}