import { forEach } from "../util"

class ModuleCollection{
  constructor(options) {
    // 递归注册模块
    this.register([],options)
  }
  register(path,rootModule) {
    let newModule = {
      _row:rootModule,
      _children:{},
      state:rootModule.state
    }
    if(path.length == 0) {
      this.root = newModule
    }else {
      // 找父节点的过程
      let parent = path.slice(0,-1).reduce((memo,current)=>{
        return memo._children[current]
      })
      parent._children[path[path.length-1]] = newModule
    }
    // 注册子模块
    if(rootModule.modules) {
      forEach(rootModule.modules,(module,moduleName)=>{
        this.register([...path,moduleName],module)
      })
    }
  }
}

export default ModuleCollection