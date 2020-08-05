
import {reactive,computed,effect,ref} from '../../source/vue3/reactivity'

//1.proxy 进行代理
const state = reactive({name:'watson',age:29,arr:[1,2,3]})
// state.arr.push(4)

//2.依赖收集
// effect(()=>{
//   console.log('effect', String(state.arr))
// })
// state.arr.push(4)

//3.计算属性
let myAge = computed(()=>{
  console.log('computed')
  return ++state.age
})
// effect(()=>{
//   console.log(myAge.value)
// })
// state.age = 200
myAge.value
// myAge.value
state.age = 200
// myAge.value
// myAge.value