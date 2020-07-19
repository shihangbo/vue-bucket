import { initMixin } from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifecycle'
import {initGlobelAPI} from './initGlobelAPI/index'

// vue核心代码
function Vue(options) {
  this._init(options)
}

//给vue原型添加方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)


//初始化全局api，Vue到静态方法
initGlobelAPI(Vue)

export default Vue


// 一、MVVM原理 数据劫持 - 数据变化驱动视图更新 Object.defineProperty() 给属性增加get方法和set方法
    // 递归解析data中的属性，增加get和set，性能查 - vue3使用proxy改进，不需要递归，也不需要增加get和set方法
    // 对象劫持：深度递归，性能差
    // 数组劫持：1.不会对索引进行观测；2.重写数据方法(7个: push/shift/unshift/pop/reverse/sort/splice)
// 二、模版编译
    // vue对模版的处理顺序：render > template > div
    // template 和 div 需要通过compilerToFunction 将模版转化成render方法
    // ast语法树 - 用对象来描述js语法的；虚拟dom - 用对象来描述dom节点；(暂无开发：注释节点，文档doctype，特殊属性style等)
    // 1.生成render方法
        // 1.1解析html字符串，将html字符串转化成ast语法树，原理：parseHTML
        // 2.2将ast语法树转化成render函数，原理：模版引擎（字符串拼接）_c('div',{id:app},_c('p',undefined,_v('hello'+_s(name))),_v('hello'))
        // 3.3模版引擎的实现：new Function() + with
    // 2.执行render方法，返回vnode
// 三、初始化渲染流程:
    // 初始化渲染：将template -> ast语法树 -> 生成render方法 -> 生成虚拟dom -> 真实dom，渲染页面
    // 更新视图：  重新生成虚拟dom -> dom diff -> 更新真实dom
    // 1.new Watcher()渲染watcher
    // 2.vm._render 执行render方法 生成vnode _c _v _s
    // 3.vm._update 执行patch方法 通过vnode 创建真实dom【替换】真实的$el，更新视图
        // 3.1 判断更新还是渲染 oldVnode是否存在nodeType属性
        // 3.2 根据虚拟节点创建真实节点createElm(vnode)，插入到当前#app节点后面insertBefore，然后移除#app节点removeChild
        // 3.3 备注 createElm方法递归到创建真实dom，vnode对象上新增el属性映射真实dom
        // 3.4 更新元素属性
// 四、生命周期的合并策略: [beforeCreate,beforeCreate]
    // initGlobelAPI 全局api 定义在 Vue.options ={} 上
    // Vue.mixin() 方法 会将用户定义的方法合并到 Vue.options对象同名的属性上，用数组进行维护，使用发布订阅模式 [beforeCreate,beforeCreate]
    // mergeOptions方法实现两个对象的合并:
        // 1.默认的属性合并: 两个对象的合并，遍历两个对象进行合并
        // 2.特殊属性:
            // 2.1 生命周期策略: LIFECYCLE_HOOKS
            // 2.2 收集依赖(订阅) strats[hook]
            // 2.3 发布执行 callHook(vm,hook)
