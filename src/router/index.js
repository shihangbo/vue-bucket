import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home.vue'
import About from '../views/about.vue'
import A from '../views/About/a.vue'
import B from '../views/About/b.vue'

const routes = [
  {
    path: '/',
    components: Home
  }, {
    path: '/about',
    components: About,
    children: [
      {path: 'a',component: A},
      {path: 'b',component: B},
    ]
  }
]

// use方法会调用 VueRouter的install方法，目的：注册全局组件 router-link router-view
Vue.use(VueRouter)
export default new VueRouter({
  routes
})