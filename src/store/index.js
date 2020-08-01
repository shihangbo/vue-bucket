import Vue from 'vue'
import Vuex from '../../source/vuex'

Vue.use(Vuex)

// 5.vuex 插件机制 - 实现持久化插件
function persists(store) {
  let id = 0
  let local = localStorage.getItem('VUEX:STATE')
  if(local) {
    store.replaceState(JSON.parse(local))
  }
  store.subscribe((mutation,state)=>{
    localStorage.setItem('VUEX:STATE',JSON.stringify(state))
  })
  if(id == 0){
    console.log('vuex 5.插件机制，vuex持久化实现')
  }
  id++
}

const store = new Vuex.Store({ // 先进行 .运算符，然后再 new
  plugins: [
    persists
  ],
  strict: true,
  namespaced: true,
  state:{
    age: 29,
    a: 1,
  },
  getters:{ // 获取 计算属性 new Vue(computed) 当依赖发生变化后会重新执行
    // 优化如果返回值相同，不会重新执行函数，主要看依赖属性age是否发生变化
    getAge(state) {
      console.log('getters执行')
      return state.age + 1
    }
  },
  mutations:{
    changeAge(state,payload) {
      console.log('更新root')
      state.age += payload
    },
    syncChangeAge() {
      state.age += payload
    }
  },
  actions:{
    changeAge({commit},payload){
      setTimeout(()=>{
        commit.call(this,'changeAge', payload)
      },1000)
    },
    asyncChangeAge({commit},payload){
      setTimeout(()=>{
        commit.call(this,'changeAge', payload)
      },1000)
    },
  },
  modules:{
    b: {
      namespaced: true,
      state: {
        age: 'b',
      },
      mutations:{
        changeAge(state,payload) {
          console.log('更新b')
          state.age += payload
        }
      },
    },
    c: {
      namespaced: true,
      state: {
        age: 'c',
      },
      mutations:{
        changeAge(state,payload) {
          console.log('更新c')
          state.age += payload
        }
      },
      modules: {
        d: {
          namespaced: true,
          state: {
            age: 'd',
          },
          mutations:{
            changeAge(state,payload) {
              console.log('更新d')
              state.age += payload
            }
          },
        }
      }
    }
  }
})

// 动态注册模块
store.registerModule(['b', 'e'], {
  state: {
    myAge: 100,
  }
})

export default store