

import {Store,install} from './store'
import {mapState,mapGetters,mapActions,mapMutations} from './helpers'

export default {
  Store,
  install,
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
}

export {
  Store,
  install,
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
}


// 总结
// 1.属性注入 $router vs $store
// 2.数据观测 defineProperty vs observe
// 3.类中使用箭头函数 解决 this指向问题
// 4.命名空间namespaced的注册方式：在注册事件时 需要组册到对应到命名空间中 根据path计算出一个空间值
// 5.vuex 插件机制

//1+7
// 定义$store属性
// state数据定义，getter实现，mutations/actions(发布订阅)，vuex持久化(插件机制)，严格模式，动态注册模块，工具方法