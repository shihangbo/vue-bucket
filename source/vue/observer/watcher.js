import {pushTarget,popTarget} from './dep.js'
import {queueWatcher} from './schedular'
let id = 0
class Watcher{
  constructor(vm,exprOrFn,callback,options) {
    this.vm = vm
    this.callback = callback
    this.options = options
    this.sync = options.sync // 标识同步watcher
    this.user = options.user // 标识wather的类型 用户watcher
    this.id = id++

    if(typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      // 用户watcher 会将 getter封装成 取值函数
      this.getter = function() {
        let path = exprOrFn.split('.')
        let val = vm
        for(let i=0;i<path.length;i++){
          val = val[path[i]]
        }
        return val
      }
    }
    
    this.deps = []
    this.depsId = new Set()
    this.value = this.get()
  }

  get() {
    pushTarget(this) // 保存当前渲染watcher
    let value = this.getter.call(this.vm)
    popTarget(this)

    return value
  }

  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  update() {
    if(this.sync) { // 同步watcher实现
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  run() {
    let oldValue = this.value
    let newValue = this.get()
    this.value = newValue
    if (this.user) { // 用户watcher处理
      this.callback.call(this.vm,newValue,oldValue)
    }
  }
}


export default Watcher