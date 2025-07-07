import { iRequestLogin, iResponseLogin } from '@/types/auth';
import { sendRequest, TypeAxiosMethod } from './api.config';
import { requestsPath } from './api.endpoints';
import { IResponseError } from '@/types/types';
import { iUserStats } from '@/types/stats';
import { iResultEntryRequest, iUser, IUserRequest } from '@/types/staff.types';
import { iQuestion } from '@/types/quiz';

export const api = {
  login: async (data: iRequestLogin): Promise<iResponseLogin | undefined> => {
    console.log('------------------------------ api login');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.login(),
        data: data,
      });
      return response.data;
    } catch (error) {
      console.error('login / error -', error);
    }
  },

  getCurrentUser: async (params: { username: string }): Promise<iUser | null> => {
    console.log('------------------------------ api getCurrentUser');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.user(),
        params: params,
      });
      return response?.data;
    } catch (error: any) {
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getCurrentUser / error    -', throwError);
      return null;
    }
  },

  getUserStats: async (params: { username: string }): Promise<iUserStats | null> => {
    console.log('------------------------------ api getUserStats');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.userStats(),
        params: params,
      });
      return response?.data;
    } catch (error: any) {
      console.log('getUserStats / error    -', error);
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };

      console.error('getUserStats / errorData    -', errorData);
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getUserStats / throwError    -', throwError);
      return null;
    }
  },

  addUserStats: async (props: {
    data: iResultEntryRequest;
    params: { username: string };
  }): Promise<iUserStats | null> => {
    console.log('------------------------------ api addUserStats');
    const { params, data } = props;

    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.userStats(),
        data: data,
        params: params,
      });
      return response?.data;
    } catch (error: any) {
      console.log('addUserStats / error -', error);
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('addUserStats / error    -', throwError);
      return null;
    }
  },

  getAllUsers: async (): Promise<iUser[] | null> => {
    console.log('------------------------------ api getAllUsers');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.users(),
      });
      return response?.data;
    } catch (error: any) {
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getAllUsers / error    -', throwError);
      return null;
    }
  },

  getAllUsersStats: async (): Promise<iUserStats[] | null> => {
    console.log('------------------------------ api getAllUsersStats');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.allStats(),
      });
      return response?.data;
    } catch (error: any) {
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getAllUsersStats / error    -', throwError);
      return null;
    }
  },

  getAllQuestions: async (): Promise<iQuestion[] | null> => {
    console.log('------------------------------ api getAllQuestions');
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.questions(),
      });
      return response?.data;
    } catch (error: any) {
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.error('getAllQuestions / error    -', throwError);
      return null;
    }
  },

  createUser: async (user: IUserRequest, token: string): Promise<iUser[] | null> => {
    console.log('------------------------------ api createUser');
    try {
      console.log('createUser -', user);
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.user(),
        data: user,
        params: { username: user.lastname },
        token,
      });
      return response?.data;
      return null;
    } catch (error: any) {
      console.log('getAllQuestions / error    -', error);
      const errorData: IResponseError['data'] = error?.response?.data || {
        message: 'Unknown error',
        errorType: 'Unknown error type',
      };
      const throwError: IResponseError = {
        status: error.status || 500,
        data: { ...errorData },
      };
      console.log('getAllQuestions / error    -', throwError);
      return null;
    }
  },

  updateUser: async (): Promise<null> => {
    return null;
  },

  deleteUser: async (): Promise<null> => {
    return null;
  },
};
