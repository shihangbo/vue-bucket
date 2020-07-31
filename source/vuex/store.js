import applyMixin from './mixin'
let Vue;

// 最终用户拿到的是这个类的实例
class Store {
  constructor(options) {
    let state = options.state
    let vm = new Vue({
      data: {
        $$state:state
      }
    })
    console.log('vuex 初始化数据完成，当前实例上能获取到响应式的state属性', vm)



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