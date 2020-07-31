

import {Store,install} from './store'

export default {
  Store,
  install,
}

export {
  Store,
  install,
}


// 总结
// 1.属性注入 $router vs $store
// 2.数据观测 defineProperty vs observe
// 3.类中使用箭头函数 解决 this指向问题