import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { BASE_URL } from './api.endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.method === 'get' || config.method === 'post') {
    console.group('axiosInstance');
    console.log('baseURL -', config.baseURL);
    console.log('url     -', config.url);
    console.log('data    -', config.data);
    console.groupEnd();
  }

  return config;
});

export default axiosInstance;
