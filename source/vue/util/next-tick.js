
let callbacks = []
let waiting = false
function flushCallbacks() {
  callbacks.forEach(cb => cb())
  waiting = false
}
export function nextTick(cb) {
  callbacks.push(cb)
  let timerFunc = () => {
    flushCallbacks()
  }
  if (waiting === false) {
    // 异步执行，微任务，宏任务
    if(Promise) {
      return Promise.resolve().then(timerFunc)
    }
    if(MutationObserver) {
      let observe = new MutationObserver(timerFunc)
      let textNode = document.createTextNode(1)
      observe.observe(textNode, {characterData: true})
      textNode.textContent = 2
      return
    }
    if(setImmediate) {
      return setImmediate(timerFunc)
    }
    setTimeout(timerFunc, 0)
    waiting = true
  }
}