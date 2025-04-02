import axiosInstance from './api.client';

export enum TypeAxiosMethod {
  // eslint-disable-next-line no-unused-vars
  get = 'get',
  // eslint-disable-next-line no-unused-vars
  post = 'post',
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
  data: any;
  headers?: any;
}) {
  const {
    method,
    endpoint,
    data = {},
    headers = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  } = props;
  const response = await axiosInstance.request({
    method,
    url: endpoint,
    data: data,
    headers,
  });
  return { data: response.data };
}
