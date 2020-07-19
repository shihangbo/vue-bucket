
export function patch(oldVnode,newVnode) {
  const isRealElement = oldVnode.nodeType
  if (isRealElement) {
    const oldElm = oldVnode
    const parentElm = oldElm.parentNode
    let el = createElm(newVnode)
    parentElm.insertBefore(el, oldElm.nextSibiling)
    parentElm.removeChild(oldElm)
    return el
  }
}

function createElm(vnode) {
  let {tag,data,key,children,text} = vnode
  if (typeof tag === 'string') { //创建真实标签
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {
      return vnode.el.appendChild(createElm(child))
    })
  } else if (tag === undefined) { //创建文本
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProperties(vnode, oldProps={}) {
  let el = vnode.el;
  let newProps = vnode.data || {};

  // 老的中有style样式，新的没有
  let oldSytle = oldProps.style
  let newStyle = newProps.style
  for(let key in oldSytle) {
    if(!newStyle[key]) {
      el.style[key] = ''
    }
  }
  // 老的中有属性，新的没有
  for(let key in oldProps) {
    if (!newProps[key]) {
      delete el[key]
    }
  }
  
  for(let key in newProps) {
    if (key === 'style') {
      for(let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName]
      }
    } else if(key === 'class') {
      el.className = newProps[key]
    } else {
      el.setAttribute(key, newProps[key])
    }
  }
}