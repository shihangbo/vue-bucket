let Vue = null

class VueRouter {
  constructor(routes) {
    
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue
  Vue.component('router-link', {
    render(h) {
      return h('a',{},[this.$slots.default])
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h('div',{},[this.$slots.default])
    }
  })
}

export default VueRouter