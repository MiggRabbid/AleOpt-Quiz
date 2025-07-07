import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

import { BASE_URL } from './api.endpoints';
import { getUserToken } from './api.config';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getUserToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.method === 'get' || config.method === 'post') {
    console.group('axiosInstance start');

    if (token) {
      console.log('token     -', token);
    }
    // console.log('config    -', config);
    console.log('axiosInstance end');
    console.groupEnd();
  }

  return config;
});

export default axiosInstance;
