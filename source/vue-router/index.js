import install from './install'
import {createMatcher} from './create-matcher'
import HashHistory from './history/hashHistory'
import BrowserHistory from './history/browserHistory'

class VueRouter {
  constructor(options) {
    let {routes = []} = options
    console.log(routes)
    // 创建匹配器
    console.log('++开始创建匹配器: 初始化用户定义的routes对象')
    this.matcher = createMatcher(routes)
    console.log('++匹配器创建完成', this.matcher)
    // 创建历史管理
    console.log('!!开始创建历史管理: 初始化不同路由状态的url路径')
    this.mode = options.mode || 'hash'
    switch(this.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new BrowserHistory(this)
        break
    }
    this.beforeHooks = []
    console.log('!!历史管理创建完成',this.history)
  }
  match(location) {
    return this.matcher.match(location)
  }
  init(app) {
    // 根据当前路径获取对应的记录，实现页面的跳转
    const history = this.history
    const setupHashListener = () => {
      history.setupListener()
    }
    history.transitionTo(history.getCurrentLocation(),setupHashListener)
    // 更新视图的操作 设置_route的最新数据
    history.listen(route=>{
      app._route = route
      console.log('$$current变化，设置_route属性，触发视图更新', app._route)
    })
  }
  push(location) {
    window.location.hash = location
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn)
  }
}

VueRouter.install = install

export default VueRouter