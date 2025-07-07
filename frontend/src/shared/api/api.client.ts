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
  console.log('config    -', config);

  if (config.headers.Authorization) {
    if (config.method === 'get' || config.method === 'post') {
      console.group('axiosInstance start / CLIENT');
      // console.log('config    -', config);
      console.log('axiosInstance end');
      console.groupEnd();
    }
    return config;
  }

  const token = await getUserToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.method === 'get' || config.method === 'post') {
    console.group('axiosInstance start / SERVER');
    console.log('token     -', token ?? 'нет');
    console.log('axiosInstance end');
    console.groupEnd();
  }

  return config;
});

export default axiosInstance;
