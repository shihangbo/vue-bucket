import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TriggerOpTypes, TrackOpTypes } from "./operation";

export function computed(getterOrOptions) {
  let getter
  let setter
  if(isFunction(getterOrOptions)){
    getter = getterOrOptions
    setter = ()=>{}
  }else{
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  let dirty = true // 缓存判断变量 默认第一次取值是执行getter方法的

  let computed

  let runner = effect(getter,{
    lazy:true, //懒加载
    computed:true, //计算属性的标识
    scheduler:()=>{
      if(!dirty){ //计算属性依赖的值发生变化，将dirty设置成true，runner可重新执行，取值
        dirty = true
        trigger(computed,TriggerOpTypes.SET,'value')  // 触发 computed 的value属性的依赖
      }
    }
  })
  let value
  computed = {
    get value(){
      if(dirty){ //多次取值，只有第一次执行runner，第二次开始直接返回value
        value = runner()
        dirty = false
        track(computed,TrackOpTypes.GET,'value') // 收集 computed 的value属性的依赖
      }
      return value
    },
    set value(newValue){
      setter(newValue)
    }
  }

  return computed
}