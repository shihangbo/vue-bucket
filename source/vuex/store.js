import applyMixin from './mixin'
import {forEach} from './util'
let Vue;

// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    // 第一版 适合一层
    // let state = options.state
    // this.getters = {}
    // let computed = {}
    // forEach(options.getters, (fn,key) => {
    //   computed[key] = () => fn(this.state);
    //   Object.defineProperty(this.getters, key, {
    //     get: () => this._vm[key]
    //   })
    // })
    // this._vm = new Vue({
    //   data: {
    //     $$state:state
    //   },
    //   computed  //计算属性 1:将属性放到实例上；2:增加缓存
    // })
    // console.log('vuex 初始化state/getters完成，当前实例上能获取到响应式的state属性', this._vm)
    // // 发布订阅模式，先将用户定义的mutation和action保存起来，当用户调用commit和dispatch的时候，找对应的方法执行
    // this._mutations = {}
    // forEach(options.mutations, (fn,type) => {
    //   this._mutations[type] = (payload) => fn.call(this,this.state,payload)
    // })
    // this._actions = {}
    // forEach(options.actions, (fn,type) => {
    //   this._actions[type] = (payload) => fn.call(this,this,payload)
    // })
    // console.log('vuex 发布订阅模式: mutations/actions 数据订阅完成')

    // 源码版

  }
  commit(type,payload) {
    this._mutations[type](payload)
  }
  dispatch(type,payload) {
    this._actions[type](payload)
  }
  // 类的属性访问器，当用户去这个实例上取state属性是，会执行这个方法
  get state() {
    return this._vm._data.$$state
  }
}

const install = _Vue => {
  Vue = _Vue
  applyMixin(Vue)
  console.log('vuex install方法执行完毕，给每个实例增加了 this.$store 属性')
}

export {
  Store,
  install
}