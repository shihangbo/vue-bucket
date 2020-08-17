


// 1、项目管理
    //1.monorepo是一种将多个package放在一个repo中的代码管理模式，使用yarn workspace + lerna来管理项目；
    //2.lerna是在js项目中用来管理多个package的工具
// 2.实现代理reactive: new Proxy + Reflect
// 3.依赖收集effect: WeakMap + Map + Set
    // 3.1vue2中的watcher，vue3中的watchEffect，effect，renderEffect都是使用了effect来实现的
    // 3.2实现原理
      // 写了一个effect，effect会执行 -> activeEffect = effect
      // 对数据进行取值，get()，取age属性，age = [effect] 生成依赖关系
      // 当用户设置age，set()，通过age 找到当前 effect，执行effect
// 4.计算属性computed: 
    // 4.1 lazy为true的effect
    // 4.2 实现原理
      // computed方法返回带有value属性的对象，
      // 定义value属性时，get() 创建一个computed为true且lazy为true的effect，age = [effect] 生成依赖，dirty为false
      // 当用户获取value属性时，dirty为false，直接原始value，
      // 当computed依赖的属性age发生变化，再次调用 scheduler的dirty值为true，重新age执行对应的effect，获取最新值
// 5.