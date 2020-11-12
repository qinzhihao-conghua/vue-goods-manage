import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.scss';
import httpService from './http/http';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(httpService);

Vue.use(ElementUI);
// 全局过滤器（管道）
Vue.filter('frmDate', value => {
  return moment(value).format('YYYY-MM-DD');
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
