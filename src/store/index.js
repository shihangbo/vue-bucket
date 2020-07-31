import Vue from 'vue'
import Vuex from '../../source/vuex'

Vue.use(Vuex)

export default new Vuex.Store({ // 先进行 .运算符，然后再 new
  state:{
    age: 29,
  },
  getters:{ // 获取 计算属性 new Vue(computed) 当依赖发生变化后会重新执行
    // 优化如果返回值相同，不会重新执行函数，主要看依赖属性age是否发生变化
    getAge(state) {
      return state.age + 1
    }
  },
  mutations:{
    changeAge(state,payload) {
      state.age += payload
    }
  },
  actions:{
    changeAge({commit}){
      setTimeout(()=>{
        commit('changeAge', 2)
      },1000)
    }
  },
  modules:{}
})