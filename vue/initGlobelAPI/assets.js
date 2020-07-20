import {ASSETS_TYPE} from './const'

export default function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach(type => {
    Vue[type] = function(id,definition) {
      if (type === 'component') {
        // 注册全局组件
        // Vue.extend 将对象变成构造函数
        // this.options._base 指向父类的构造函数
        console.log('组件系统 - 子组件处理: ', id,definition)
        definition = this.options._base.extend(definition)

      } else if (type === 'filter') {

      } else if (type === 'directive') {

      }
      this.options[type+'s'][id] = definition

    }
  })
}