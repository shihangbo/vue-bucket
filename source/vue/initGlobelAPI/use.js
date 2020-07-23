
import { toArray } from '../util/index'

export default function initUse(Vue) {
  Vue.use = function(plugin) {
    if (plugin.installed) {
      return
    }
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    plugin.installed = true
    return this
  }
}