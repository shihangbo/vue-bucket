import { initMixin } from './init'
import {renderMixin} from './render'
import {lifecycleMixin} from './lifecycle'
import {initGlobelAPI} from './initGlobelAPI/index'
import {stateMixin} from './state'

// vue核心代码
function Vue(options) {
  this._init(options)
}

//给vue原型添加方法
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)

stateMixin(Vue) // 拓展 vm.$watch方法


//初始化全局api，Vue到静态方法
initGlobelAPI(Vue)

export default Vue


// 一、MVVM原理 1.数据劫持 - 数据变化驱动视图更新 Object.defineProperty() 给属性增加get方法和set方法
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
    // 1.new Watcher() - 渲染watcher
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
// 五、MVVM原理 2.数据变化驱动视图更新，即对象的【依赖收集】-Dep类实现，（数据变化可以自动执行渲染watcher）
    // 1.对象：数据驱动视图更新vue使用观察者模式 Dep类的实现
    // 2.数组：数据驱动视图更新，单独的处理，递归处理数组的嵌套
// 六、异步更新 在数据变化的时候 dep.notify() -> watcher.update() -> queueWatcher(this)
    // 1.批量更新处理 queueWatcher方法，setTimeout
    // 2.nextTick 的实现，1.根据watcher id对watcher进行过滤；2.延迟执行: vue使用策略 - 微任务，宏任务 - Promise/MutationObserver/setImmediate/setTimeout
// 七、组件系统 - 组件的定义
    // 1.全局方法 initAssetRegisters 中对 全局组件/过滤器/指令进行定义；
    // 2.initExtend 方法实现 Vue.extend: 返回组件的构造函数，通过new 这个构造函数生成实例，继承父类的属性和方法；
    // 3.组件的合并策略: 同名的父子组件和属性应当同时存在
    // 4.如何将组件标签和组件对应起来？createElement 方法中的 let Ctor = vm.$options.components[tag] // 找到组件的定义 构造函数
// 八、组件系统 - 组件的渲染
    // 1.patch.js的createElm创建标签的时候需要进行判断，不是string就是普通的html
    // 2.组件的实例 放在 vnode.componentInstance属性上
    // 3.组件渲染主动调用 child.$mount()，没有el属性，即patch方法没有oldVnode参数，渲染另外处理
    // 4.全局组件和局部组件的区别：全局组件挂载到根上，局部组件挂载到对应到父类$el上；
    // 5.总结：组件在使用时会调用Vue.extend方法，创建一个构造函数
            //实例化自组件时，会将当前选项和用户定义选项合并，mergeOptions
            //通过创建实例，内部会调用子类_init方法(子组件调用$mount方法)，创建子组件渲染watcher，将渲染后到结果放到对应到vm.#el上；
// 九、watcher的实现
    // 0.watch的原理是通过 Watcher实现的 - 用户watcher
    // 1.watch的用法（watch对象和vm.$watch()是同一个实现）：
          //1.函数用法 watson(newValue,oldValue){}; 
          //2.1对象用法 watson:{handler(newValue,oldValue){},deep:true,sync:true}
          //2.2对象用法 watson:{handler:'handler',deep:true,sync:true}; handler方法会去methods对象里面找
          //3.数组对象用法 对象的叠加用数组包裹
    // 2.实现
          //1.vue实例上定义 $watch方法 创建用户watcher 用户watcher的标识 options.user 为true
          //2.对watcher实例上的getter封装成取值函数，从而现实对于用户watcher的收集
          //3.对应watcher值发生变化的时候，会调用run方法，如果是用户watcher，执行用户定义的cb函数
// 十、计算属性的实现
    // 0.computed的原理是通过 Watcher来实现的 - 计算属性watcher
    // 1.computed和watcher区别
        //1.watch默认会对变量取值，computed默认不会只有当取值当时候才会执行
        //2.computed有缓存，所依赖当属性没有变化的时候，不会重复取值
        //3.computed定义的属性，可以在模版中{{computed}}直接使用
    // 2.通过watcher来实现的