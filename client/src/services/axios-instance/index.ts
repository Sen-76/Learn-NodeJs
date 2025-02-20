import { cookie } from '@/helpers/cookie';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_SERVER;
console.log(apiUrl);
const user: A = cookie.getCookie('userLogin') ?? '{}';
const token = JSON.parse(user)?.token ?? '';
const source = axios.CancelToken.source();

const axiosInstance = axios.create({
  timeout: 600000,
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  cancelToken: source.token,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
