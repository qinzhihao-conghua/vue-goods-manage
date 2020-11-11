import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home/home.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
