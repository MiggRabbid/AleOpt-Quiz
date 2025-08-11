import { getServerSession } from 'next-auth';

import axiosInstance from './api.client';
import { authOptions } from '@/shared/lib';

export const getUserToken = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.token || null;
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

export async function sendRequest(props: {
  method: string;
  endpoint: string;
  data?: any;
  params?: any;
  headers?: any;
  token?: string;
}) {
  const {
    method,
    endpoint,
    data = {},
    headers = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    params = {},
    token,
  } = props;

  const headerWithToken = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await axiosInstance.request({
    method,
    url: endpoint,
    data,
    params,
    headers: !!token ? headerWithToken : headers,
  });
  return { data: response.data };
}
