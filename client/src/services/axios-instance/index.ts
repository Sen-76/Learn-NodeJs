import { cookie } from '@/helpers/cookie';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_SERVER;
const token = cookie.getCookie('token') ?? '';
const source = axios.CancelToken.source();

const axiosInstance = axios.create({
  timeout: 600000,
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
  cancelToken: source.token,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
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
