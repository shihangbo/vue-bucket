import {observer} from './index'
import { arrayMethods } from './array'
import {def} from '../util/index'
import Dep from './dep'

export function defineReactive(data, key, value) {
  observer(value) // 1.深度检测，data里面的属性还是对象的时候，再进行数据劫持
  let dep = new Dep()
  Object.defineProperty(data, key, {
    configurable:true,
    enumerable:true,
    get: function() {
      console.log('获取数据')
      // 三、依赖收集 class Dep{} 数据发布者
      if (Dep.target) {
        dep.depend(Dep.target)
      }
      return value
    },
    set: function (newValue) {
      if (newValue === value) return;
      console.log('设置数据，如果新值是对象也应该进行监控')
      observer(newValue)  // 2.用户赋值的时候如果是一个对象，也需要进行数据劫持
      value = newValue
      console.log(dep)
      dep.notify()
    }
  })
}
class Observer{
  constructor(data){
    // data.__ob__ = this // 给每个监控过的对象都增加一个__ob__属性
    def(data, '__ob__', this)
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      this.observerArray(data)
    } else {
      this.walk(data)
    }
  }

  observerArray(inserted) {
    for(let i=0; i<inserted.length; i++) {
      observer(inserted[i])
    }
  }
  walk(data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

export default Observer