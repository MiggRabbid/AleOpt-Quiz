import { iRequestLogin, iResponseLogin } from '@/types/auth';
import { sendRequest, TypeAxiosMethod } from './api.config';
import { requestsPath } from './api.endpoints';

export const api = {
  login: async (data: iRequestLogin): Promise<iResponseLogin | undefined> => {
    console.group('------------------------------ api login');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.login(),
        data: data,
      });
      console.log('response -', response);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      console.groupEnd();
    }
  },
};
