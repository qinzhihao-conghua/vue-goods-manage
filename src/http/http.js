import axios from 'axios';

const httpService = {};
httpService.install = (Vue) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';


    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 设置请求头
        if (config.url !== 'login') {
            const token = sessionStorage.getItem("token");
            config.headers['Authorization'] = token;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    // 添加实例方法
    Vue.prototype.$axios = axios;
};
export default httpService;
