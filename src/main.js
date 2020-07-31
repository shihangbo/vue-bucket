
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Vuex from '../source/vuex'

new Vue({
  name: 'root',
  el: '#app',
  render: h=>h(App),
  router,
  data() {
    return {
      a:1
    }
  }
})