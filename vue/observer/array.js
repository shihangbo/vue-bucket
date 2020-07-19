import { observer } from "./index"

// 拦截数组的7个方法 push pop unshift shift splice sort reverse

let oldArrayProtoMethods = Array.prototype
// Object.create() 原型链查找
// value.__proto__ = arrayMethods
// arrayMethods.__proto__ = oldArrayProtoMethods
export let arrayMethods = Object.create(oldArrayProtoMethods)
let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    let r = oldArrayProtoMethods[method].apply(this, args)
    // 函数劫持
    let inserted
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if(inserted) ob.observerArray(inserted);

    // 数组的数据变化，驱动视图更新
    ob.dep.notify()

    return r
  }
})