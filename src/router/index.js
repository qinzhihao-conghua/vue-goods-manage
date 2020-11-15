import Vue from 'vue'
import VueRouter from 'vue-router'
import users from '@/components/users/users.vue'
import rights from '@/components/rights/rights.vue'
import roles from '@/components/roles/roles.vue'
import goods from '@/components/goods/goods.vue'
import params from '@/components/params/params.vue'
import categories from '@/components/categories/categories.vue'
import orders from '@/components/orders/orders.vue'
import reports from '@/components/reports/reports.vue'

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
      { path: '/users', name: 'users', component: users },
      { path: '/rights', name: 'rights', component: rights },
      { path: '/roles', name: 'roles', component: roles },
      { path: '/goods', name: 'goods', component: goods },
      { path: '/params', name: 'params', component: params },
      { path: '/categories', name: 'categories', component: categories },
      { path: '/orders', name: 'orders', component: orders },
      { path: '/reports', name: 'reports', component: reports }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
