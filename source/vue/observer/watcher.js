import {pushTarget,popTarget} from './dep.js'
import {queueWatcher} from './schedular'
let id = 0
class Watcher{
  constructor(vm,exprOrFn,callback,options) {
    this.vm = vm
    this.callback = callback
    this.options = options
    this.id = id++
    this.getter = exprOrFn

    this.deps = []
    this.depsId = new Set()
    this.get()
  }

  get() {
    pushTarget(this) // 保存当前渲染watcher
    this.getter()
    popTarget(this)
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
    queueWatcher(this)
  }

  run() {
    this.get()
    // let oldValue = this.value
    // let newValue = this.get()
    // this.value = newValue
    // if (this.user) { // 用户watcher处理
    //   this.cb.call(this.vm,newValue,oldValue)
    // }
  }
}


export default Watcher