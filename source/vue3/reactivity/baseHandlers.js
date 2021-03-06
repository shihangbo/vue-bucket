import { isObject, hasOwn, hasChanged } from "../shared/utils"
import { reactive } from "./reactive"
import { track, trigger } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operation"

const get = createGetter()
const set = createSetter()
function createGetter(){
  return function get(target,key,receiver){ //proxy + reflect
    const res = Reflect.get(target,key,receiver)
    // todo...
    // console.log('获取值',target,key,receiver)
    // 依赖收集
    track(target,TrackOpTypes.GET,key)
    // 深度递归 如果获取到的值是对象，在进行代理
    if(isObject(res)) {
      return reactive(res)
    }
    return res
  }
}
function createSetter(){
  return function set(target,key,value,receiver){
    const haskey = hasOwn(target,key)
    const oldValue = target[key]
    const res = Reflect.set(target,key,value,receiver)
    // todo...
    if (!haskey){
      console.log('属性新增操作',target,key)
      //触发更新
      trigger(target,TriggerOpTypes.ADD,key,value)
    } else if(hasChanged(value,oldValue)) {
      // console.log('修改操作',target,key)
      //触发更新
      trigger(target,TriggerOpTypes.SET,key,value)
    }
    // 值没有变化什么都不做
    return res
  }
}
export const mutableHandler = {
  get,
  set
}