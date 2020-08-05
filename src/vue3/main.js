
import {reactive,computed,effect,ref} from '../../source/vue3/reactivity'

//proxy 进行代理
const state = reactive({name:'watson',age:29,arr:[1,2,3]})
state.arr.push(4)
