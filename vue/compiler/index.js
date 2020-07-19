// ast语法树 vs 虚拟dom
import {parseHTML} from './parseHTML'
import {generate} from './generate'

export function compilerToFunction(template) {
  let root = parseHTML(template)
  console.log('ast语法树生成: ',root)
  // _c('div',{id:app},_c('p',undefined,_v('hello'+_s(name))),_v('hello'))
  let code = generate(root)
  console.log('字符串模版生成: ', code)
  let renderFn = new Function(`with(this){return ${code}}`)
  console.log('render函数(模版引擎): ', renderFn)
  return renderFn
}
