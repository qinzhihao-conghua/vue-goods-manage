import Vue from 'vue'
import VueRouter from 'vue-router'
import users from '@/components/users/users.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login/login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/home/home.vue'),
    redirect: 'users',
    children: [
      // 子路由注意要加/开头，不然找不到
      { path: '/users', name: 'users', component: users }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
