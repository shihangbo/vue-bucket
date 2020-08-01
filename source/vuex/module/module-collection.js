import { forEach } from "../util"
import Module from "./module"

class ModuleCollection{
  constructor(options) {
    // 递归注册模块
    this.register([],options)
  }
  register(path,rootModule) {
    let newModule = new Module(rootModule)
    // 把当前要组册的模块 做一个映射
    rootModule.rawModule = newModule
    if(path.length == 0) {
      this.root = newModule
    }else {
      // 找父节点的过程
      let parent = path.slice(0,-1).reduce((memo,current)=>{
        return memo.getChild(current)
      },this.root)
      parent.addChild(path[path.length-1],newModule)
    }
    // 注册子模块
    if(rootModule.modules) {
      forEach(rootModule.modules,(module,moduleName)=>{
        this.register([...path,moduleName],module)
      })
    }
  }
  getNamespace(path) {
    let root = this.root
    return path.reduce((namespace,key)=>{
      root = root.getChild(key)
      return namespace + (root.namespaced?key+'/':'') 
    },'')

  }
}

export default ModuleCollection