
export function isObject(data) {
  return (typeof data === 'object' && data !== null)
}
export function def(data,key,value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

export function proxy(vm,source,key) {
  Object.defineProperty(vm,key,{
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestory',
  'destroyed'
]
let strats = {}
function mergeHook(parentVal,childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

export function mergeOptions(parent, child) {
  let options = {}
  for(let key in parent) {
    mergeField(key)
  }
  for(let key in child) {
    if(!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    // 特殊属性策略实现
    if (strats[key]) {
      return options[key] = strats[key](parent[key],child[key])
    }
    if (typeof parent[key] === 'object' && typeof child[key] === 'object') {
      options[key] = {...parent[key],...child[key]}
    } else if (child[key] == null) {
      options[key] = parent[key]
    } else {
      options[key] = child[key]
    }
  }
  return options
}
