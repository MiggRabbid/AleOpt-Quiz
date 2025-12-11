import { axiosInstance } from '.';

import type { TRequestPath, TypeAxiosMethod } from '.';

export async function sendRequest<D, R>(props: {
  method: TypeAxiosMethod;
  data?: D;
  endpoint: TRequestPath;
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

  return response.data as R;
}
