export function createRoute(record,location) {
  let matched = []
  if (record) {
    while(record){
      matched.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched
  }
}

const runQueue = (queue,iterator,complete) => {
  function next(index) {
    if (index>=queue.length) {
      return complete()
    }
    let hook = queue[index]
    iterator(hook,()=>next(index+1))
  }
  next(0)
}
export default class History {
  constructor(router){
    this.router = router
    // 当前url 匹配出来的记录
    // / {path:'/',component:home}
    // /about/a [{path:'/about',component:about},{path:'/about/a',component:a}]
    // 渲染核心：this.current 变化触发视图更新
    this.current = createRoute(null, {
      path: '/'
    })
  }
  transitionTo(location,complete) {
    // console.log(location, this) // 这里的this，指向hashHistory实例
    let current = this.router.match(location)

    if (this.current.path == location && this.current.matched.length === current.matched.length) {
      return
    }

    // 钩子函数
    const iterator = (hook,next) => {
      hook(current,this.current,next)
    }
    let queue = this.router.beforeHooks
    runQueue(queue,iterator,()=>{
      this.current = current
      this.cb && this.cb(current)
      // console.log(this.current)
      complete && complete()
    })

  }
  listen(cb) {
    this.cb = cb
  }
}