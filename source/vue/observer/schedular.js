import {nextTick} from '../util/next-tick'

// 1.相同的渲染watcher进行过滤；2.延迟执行
let has = {};
let queue = [];
function flushSchedularQueue() {
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}
export function queueWatcher(watcher) {
  let id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)
    nextTick(flushSchedularQueue)
  }
}

