import axios from 'axios';

const httpService = {};
httpService.install = (Vue) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
    // 添加实例方法
    Vue.prototype.$axios = axios;
};
export default httpService;
