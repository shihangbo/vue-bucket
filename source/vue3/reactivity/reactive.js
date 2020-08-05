import { isObject } from "../shared/utils";
import { mutableHandler } from "./baseHandlers";

export function reactive(target) {
  // 创建响应式对象 目标可以是对象，数组，set，map
  return createReactiveObject(target, mutableHandler)
}

function createReactiveObject(target,baseHandler){
  if(!isObject(target)){
    return target
  }
  const observed = new Proxy(target,baseHandler)
  return observed
}