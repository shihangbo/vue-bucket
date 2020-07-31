import Vue from 'vue'
import VueRouter from '../../source/vue-router/index'

import Home from '../views/home.vue'
import About from '../views/about.vue'
import A from '../views/About/a.vue'
import B from '../views/About/b.vue'

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/about',
    component: About,
    children: [
      {path: 'a',component: A},
      {path: 'b',component: B},
    ]
  }
]

// use方法会调用 VueRouter的install方法，目的：注册全局组件 router-link router-view
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach((to,from,next)=> {
  setTimeout(function(){
    console.log('beforeEach 11111')
    next()
  },1000)
})
export default router