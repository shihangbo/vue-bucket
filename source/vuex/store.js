import applyMixin from './mixin'
import {forEach} from './util'
import ModuleCollection from './module/module-collection'
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
    // - 1.生成树型模版：收集模块生成树型结构 递归 - ModuleCollection
    this._modules = new ModuleCollection(options)
    console.log('vuex 1.生成树型模版完成',this._modules)
    // - 2.安装树型模版：将模块树型定义到Store实例上 递归 - installModule
    let state = this._modules.root.state
    this._mutations = {}
    this._actions = {}
    this._wrappedGetters = {}
    installModule(this,state,[],this._modules.root)
    console.log('vuex 2.安装树型模版完成')
    console.log('state: ', state)
    console.log('mutations: ', this._mutations)
    console.log('actions: ', this._actions)
    console.log('getters: ', this._wrappedGetters)
    // - 3.挂载状态：将状态放到vue实例中 - 渲染页面 resetStoreVm
    resetStoreVm(this,state)
    console.log('vuex 3.挂载状态完成 页面渲染')

  }
  commit(type,payload) {
    this._mutations[type].forEach(fn=>fn(payload))
  }
  dispatch(type,payload) {
    this._actions[type].forEach(fn=>fn(payload))
  }
  // 类的属性访问器，当用户去这个实例上取state属性是，会执行这个方法
  get state() {
    return this._vm._data.$$state
  }
}
function resetStoreVm(store,state) {
  const warppedGetters = store._wrappedGetters
  let computed = {}
  store.getters = {}
  forEach(warppedGetters,(fn,key)=>{
    computed[key] = function() {
      return fn()
    }
    Object.defineProperty(store.getters,key,{
      get:()=>store._vm[key]
    })
  })
  store._vm = new Vue({
    data:{
      $$state:state
    },
    computed
  })
}
function installModule(store,rootState,path,module) {
  if(path.length>0) { //如果是子模块，将子模块到状态定义到根模块上
    let parent = path.slice(0,-1).reduce((memo,current)=>{
      return memo[current]
    },rootState)
    // Vue.set 新增属性，如果本身对象不是响应式会直接赋值 利用api能区分是否是响应式数据
    Vue.set(parent,path[path.length-1],module.state)
  }
  module.forEachMutation((mutation,type)=>{ // {changeAge:[fn,fn,fn]}
    store._mutations[type] = store._mutations[type] || []
    store._mutations[type].push((payload)=>{   // 函数包装
      mutation.call(store,module.state,payload)
    })
  })
  module.forEachActions((action,type)=>{
    store._actions[type] = store._actions[type] || []
    store._actions[type].push((payload)=>{   // 函数包装
      action.call(store,store,payload)
    })
  })
  module.forEachGetters((getter,key)=>{
    store._wrappedGetters[key] = function(params) {
      return getter(module.state)
    }
  })
  module.forEachChild((child,key)=>{
    installModule(store,rootState,path.concat(key),child)
  })
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