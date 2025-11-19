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
  if (config.headers.Authorization) return config;

  const token = await getUserToken();

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default axiosInstance;
