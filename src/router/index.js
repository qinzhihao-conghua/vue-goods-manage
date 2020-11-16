import Vue from 'vue'
import VueRouter from 'vue-router'
import users from '@/components/users/users.vue'
import rights from '@/components/rights/rights.vue'
import roles from '@/components/roles/roles.vue'
import goodsList from '@/components/goods/goods-list.vue'
import goodsAdd from '@/components/goods/goods-add.vue'
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
      { path: '/goods', name: 'goods-list', component: goodsList },
      { path: '/add', name: 'goods-add', component: goodsAdd },
      { path: '/params', name: 'params', component: params },
      { path: '/categories', name: 'categories', component: categories },
      { path: '/orders', name: 'orders', component: orders },
      { path: '/reports', name: 'reports', component: reports }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  // 无法配合element组件
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
});
/**
 * 全局路由守卫
 * @param to 即将要进入的目标 路由对象
 * @param from 当前导航正要离开的路由
 */
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = sessionStorage.getItem('token');
    if (!token) {
      routes.push({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
