import axios from 'axios';
import { BASE_URL } from './';

import type { InternalAxiosRequestConfig } from 'axios';

export const getUserToken = async () => {
  const token = localStorage.getItem('token');
  return token ?? null;
};

export enum TypeAxiosMethod {
  // eslint-disable-next-line no-unused-vars
  get = 'get',
  // eslint-disable-next-line no-unused-vars
  post = 'post',
  // eslint-disable-next-line no-unused-vars
  put = 'put',
  // eslint-disable-next-line no-unused-vars
  delete = 'delete',
}

export const headersJson = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const headersForm = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};

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

export { axiosInstance };
