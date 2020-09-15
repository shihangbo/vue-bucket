import Vue from 'vue'
import App from './App.vue'
import createRouter from './createRouter'

export default ()=>{
  const router = createRouter()
  const app = new Vue({
    router,
    render: h=>h(App)
  })
  return {app, router}
}
