
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

Vue.component('jsx-example', {
  render (h) { // <-- h must be in scope
    return h('div', {
      attrs: {
        id: 'foo'
      }
    }, [this.$slots.default])
  }
})

new Vue({
  el: '#app',
  render: h=>h(App),
  router
})