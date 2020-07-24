import History from './base'
function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}
export default class HashHistory extends History {
  constructor(router) {
    super(router)
    this.router = router
    // 如果没有hash，默认跳转首页 #/
    ensureSlash()
  }
  getCurrentLocation() {
    return window.location.hash.slice(1) // 去掉#
  }
  setupListener() {
    window.addEventListener('hashchange',()=> {
      this.transitionTo(this.getCurrentLocation())
      console.log('hash change')
    })
  }
}