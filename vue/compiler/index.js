// ast语法树 vs 虚拟dom
import {parseHTML} from './parseHTML'
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

function genProps(attrs) {
  let str = ''
  for (let i=0;i<attrs.length;i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key,value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}
function gen(node) {
  if (node.type == 1) { // 元素
    return generate(node)
  } else { // 文本
    let text = node.text
    // _v('hello'+_s(name)+'world'))
    let tokens = []
    let match,index
    let lastIndex = defaultTagRE.lastIndex = 0
    while(match = defaultTagRE.exec(text)) {
      index = match.index
      if (index>lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex,index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex<text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}
function genChildren(el) {
  let children = el.children
  if (children && children.length) {
    return `${children.map(c=>gen(c)).join(',')}`
  } else {
    return false
  }
}
function generate(el) {
  let children = genChildren(el)
  let code = `_c("${el.tag}",${
    el.attrs.length?genProps(el.attrs):'undefined'
  }${
    children?`,${children}`:''
  })`
  return code
}

export function compilerToFunction(template) {
  let root = parseHTML(template)
  console.log('ast语法树生成: ',root)
  // _c('div',{id:app},_c('p',undefined,_v('hello'+_s(name))),_v('hello'))
  let code = generate(root)
  console.log('模版字符串生成: ', code)
  let renderFn = new Function(`with(this){return ${code}}`)
  console.log('render函数(模版引擎): ', renderFn)
  return renderFn
}
