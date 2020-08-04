import {observer} from './index'
import { arrayMethods } from './array'
import {def} from '../util/index'
import Dep from './dep'

export function defineReactive(data, key, value) {
  let dep = new Dep()

  let childOb = observer(value) // 1.深度检测，data里面的属性还是对象的时候，再进行数据劫持
  
  Object.defineProperty(data, key, {
    configurable:true,
    enumerable:true,
    get: function() {
      // 三、依赖收集 class Dep{} 数据发布者
      if (Dep.target) { // 对象依赖的收集
        if (Dep.target.user) {
          console.log('用户watcher收集', Dep.target)
        }
        dep.depend()
        if (childOb) { // 数组依赖的收集
          childOb.dep.depend()
          // 数组中嵌套数据的情况，外层数据需要收集内层数组的依赖
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      // console.log('获取数据: ', key, '收集依赖Dep: ', dep)
      return value
    },
    set: function (newValue) {
      if (newValue === value) return;
      observer(newValue)  // 2.用户赋值的时候如果是一个对象，也需要进行数据劫持
      value = newValue
      dep.notify()
      // console.log('设置数据，如果新值是对象也应该进行监控')
    }
  })
}
function dependArray(value) {
  for(let i=0;i<value.length;i++) {
    let current = value[i]
    current.__ob__ && current.__ob__.dep.depend()
    if(Array.isArray(current)) {
      dependArray(current)
    }
  }
}
class Observer{
  constructor(data){
    this.dep = new Dep()  // 给数组增加dep
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