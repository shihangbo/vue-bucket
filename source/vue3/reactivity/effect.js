import { TriggerOpTypes } from "./operation"

export function effect(fn,options={}) {
  //创建响应式effect
  const effect = createReactiveEffect(fn,options)
  if(!options.lazy){
    effect()
  }
  return effect
}

//创建响应式effect
let uid = 0
let activeEffect
const effectStack = []
function createReactiveEffect(fn,options){
  const effect = function reactiveEffect(){
    if(!effectStack.includes[effect]){ // 防止出现 state.age = state.age++ 出现死循环，只更新一次即可
      try{
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      }finally{
        effectStack.pop()
        activeEffect = effectStack[effectStack.length-1]
      }
    }
  }
  effect.options = options
  effect.id = uid++
  effect.deps = [] // 依赖哪些属性，当这些属性变化时，自动执行reactiveEffect方法

  return effect
}

const targetMap = new WeakMap()
//依赖收集 结构化数据 WeakMap { "{age:29}":{age:set(effect)} }
export function track(target,type,key){ // a = [effect,effect] b = [effect]
  if(activeEffect==undefined){ // 不是effect的取值操作
    return
  }
  let depsMap = targetMap.get(target)
  if(!depsMap){
    targetMap.set(target,(depsMap=new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep){
    depsMap.set(key,(dep=new Set))
  }
  // console.log(111,key,dep)
  if(!dep.has(activeEffect)){
    dep.add(activeEffect)
    activeEffect.deps.push(dep) // 让这个effect 记录 dep属性
  }
}
//触发执行
export function trigger(target,type,key,value){
  const depsMap = targetMap.get(target)
  if(!depsMap){
    return
  }
  const run = effects => {
    if(effects) {effects.forEach(effect => effect())}
  }
  if(key!==null){
    run(depsMap.get(key))
  }
  // 数组的特殊处理 对数组新增属性 会触发length对应依赖，触发在取值的时候对length的收集依赖(数组调用.length,JOSN.stringify等字符串化数组的操作都会收集length对应的依赖)
  if(type===TriggerOpTypes.ADD){
    run(depsMap.get(Array.isArray(target)?'length':''))
  }
}