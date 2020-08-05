


// 1、项目管理
    //1.monorepo是一种将多个package放在一个repo中的代码管理模式，使用yarn workspace + lerna来管理项目；
    //2.lerna是在js项目中用来管理多个package的工具
// 2.实现代理reactive: new Proxy + Reflect
// 3.依赖收集effect: 
    // 3.1vue2中的watcher，vue3中的watchEffect，effect，renderEffect都是使用了effect来实现的
    // 3.2实现原理
      // 写了一个effect，effect会执行 -> activeEffect = effect
      // 对数据进行取值，get()，去age属性，age = [effect] 生成依赖关系
      // 当用户设置age，set()，通过age 找到当前 effect，执行effect