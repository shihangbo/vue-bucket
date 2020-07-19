import {pushTarget,popTarget} from './dep.js'
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

  addSub(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  update() {
    this.get()
  }
}

export default Watcher