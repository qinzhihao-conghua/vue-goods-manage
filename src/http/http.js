import axios from 'axios';

const httpService = {};
httpService.install = (Vue) => {
    // 4. 添加实例方法
    Vue.prototype.$axios = axios;
};
export default httpService;
