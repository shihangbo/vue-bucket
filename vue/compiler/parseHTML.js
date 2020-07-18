
const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture) // arg[0] 匹配到标签，arg[1] 匹配到标签名
const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>') // 匹配到结尾标签
const singleAttrIdentifier = /([^\s"'<>/=]+)/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
)
const startTagClose = /^\s*(\/?)>/
const doctype = /^<!DOCTYPE [^>]+>/i
const comment = /^<!--/
const conditionalComment = /^<!\[/
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

let root = null  // ast语法树树根
let currentParent = null // 标识当前父节点
let stack = [] // 当前开始标签的数组，匹配到开始标签推入栈中，匹配到结束标签且与栈顶一致，将栈顶标签弹出
const ELEMENT_TYPE = 1
const TEXT_TYPE = 3

function createASTElement(tagName,attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null
  }
}
function createASTText(text) {
  return {
    text,
    type: TEXT_TYPE,
  }
}

function start(tagName,attrs) {
  let element = createASTElement(tagName,attrs)
  if (!root) {
    root = element
  }
  currentParent = element // 标记当前元素
  stack.push(element)
}
function chars(text) {
  text = text.replace(/\s/g,'')
  if (text) {
    currentParent.children.push(createASTText(text))
  }
}
// <div><p>  [div]
function end(tagName) {
  let element = stack.pop()
  // 标识当前标签p是属于div到儿子
  currentParent = stack[stack.length-1]
  if (currentParent) {
    element.parent = currentParent
    currentParent.children.push(element)
  }
}
export function parseHTML(html) {
  while(html) {
    let textEnd = html.indexOf('<')
    if (textEnd == 0) { // 原生标签 <div>
      let startTagMatch = parseStartTag()
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      let endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    let text
    if (textEnd >= 0) { // 空格 文本
      text = html.substring(0,textEnd)
    }
    if (text) {
      advance(text.length)
      chars(text)
    }
  }
  function advance(n) {
    html = html.substring(n)
  }
  function parseStartTag() {
    let start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length) // 匹配开始标签的 <div ，截掉
      let end,attr;
      while(!(end = html.match(startTagClose))&&(attr=html.match(attribute))) {
        advance(attr[0].length) // 匹配开始标签的属性 id='app'，截掉
        match.attrs.push({name: attr[1],value: attr[3]||attr[4]||attr[5]})
      }
      if (end) { // 匹配开始标签的 >，截掉
        advance(end[0].length)
        return match
      }
    }
  }
  return root
}

