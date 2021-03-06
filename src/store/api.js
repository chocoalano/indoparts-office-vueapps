import axios from 'axios';
import store from './index.js'

const $axios = axios.create({
    baseURL: 'http://localhost:3333/api',
    headers: {
        'Content-Type': 'application/json',
    }
});
$axios.interceptors.request.use(
    function (config) {
        const token = store.state.token
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default $axios;