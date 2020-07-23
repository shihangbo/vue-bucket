import {isReservedTag, isObject} from '../util/index'
export function createElement(vm, tag,data={},...children) {
  let key = data.key
  if (key) {
    delete data.key
  }
  if(isReservedTag(tag)) { // 原始标签
    return vnode(tag,data,key,children,undefined)
  } else { // 组件
    let Ctor = vm.$options.components[tag] // 找到组件的定义 构造函数
    return createComponent(vm,tag,data,key,children,Ctor)
  }
}
function createComponent(vm,tag,data,key,children,Ctor) {
  if (isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor)
  }
  data.hook = {
    init(vnode) {
      let child = vnode.componentInstance = new Ctor({_isComponent:true})
      child.$mount()
    }
  }
  return vnode(`vue-component-${Ctor.cid}-${tag}`,data,key,undefined,undefined, {Ctor,children})
}
export function createTextNode(vm, text) {
  return vnode(undefined,undefined,undefined,undefined,text)
}

function vnode(tag,data,key,children,text,componentOptions) {
  return {
    tag,data,key,children,text,componentOptions
  }
}