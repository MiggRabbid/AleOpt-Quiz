import { iRequestLogin, iResponseLogin } from '@/types/auth';
import { sendRequest, TypeAxiosMethod } from './api.config';
import { requestsPath } from './api.endpoints';
import { iUser } from '@/types/user';
import { IResponseError } from '@/types/types';

export const api = {
  login: async (data: iRequestLogin): Promise<iResponseLogin | undefined> => {
    console.group('------------------------------ api login');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.login(),
        data: data,
      });
      console.log('login / response -', response);
      return response.data;
    } catch (error) {
      console.error('login / error -', error);
    } finally {
      console.groupEnd();
    }
  },

  getUserStats: async (params: { username: string }): Promise<iUser | void> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.userStats(),
        params: params,
      });
      console.log('getUserStats  / response   -', JSON.stringify(response));
      return response?.data;
    } catch (error: any) {
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      console.log('getUserStats  / error.status -', error.status);
      console.log('getUserStats  / error   -', JSON.stringify(error));
      console.log('getUserStats  / error.data   -', JSON.stringify(errorData, null, 2));
      console.log('getUserStats  / error   -', error);
      console.log(
        '-------------------------------------------------------------------------',
      );
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getUserStats / error    -', throwError);
    }
  },
};
