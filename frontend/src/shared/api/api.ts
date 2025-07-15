import { sendRequest, TypeAxiosMethod } from './api.config';
import { requestsPath } from './api.endpoints';
import { getReturnedError } from './api.service';

import { iRequestLogin, iResponseLogin } from '@/types/auth.types';
import { iUserStats } from '@/types/stats.types';
import {
  iResultEntryRequest,
  iUser,
  IUserRequest,
  iUsersResponse,
} from '@/types/staff.types';
import { iQuestion, iQuestionResponse } from '@/types/quiz.types';

export const api = {
  /* Авторизация */
  login: async (data: iRequestLogin): Promise<iResponseLogin | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.login(),
        data: data,
      });
      return response.data;
    } catch (error: any) {
      console.error('login error /', error);
      const throwError = getReturnedError<iResponseLogin>(error);
      console.error('login', throwError);
      return null;
    }
  },

  /* Получение данных пользователя */
  getCurrentUser: async (params: { username: string }): Promise<iUser | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.user(),
        params: params,
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iUser>(error);
      console.error('getCurrentUser -', throwError);
      return null;
    }
  },

  /* Получение статистики пользователя */
  getUserStats: async (params: { username: string }): Promise<iUserStats | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.userStats(),
        params: params,
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iUserStats>(error);
      console.error('getUserStats -', throwError);
      return null;
    }
  },

  /* Обновление статистики пользователя */
  addUserStats: async (props: {
    data: iResultEntryRequest;
    params: { username: string };
    token: string;
  }): Promise<iUserStats | null> => {
    const { params, data, token } = props;

    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.userStats(),
        data: data,
        params: params,
        token,
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iUserStats>(error);
      console.error('addUserStats -', throwError);
      return null;
    }
  },

  /* Получение всех пользователей */
  getAllUsers: async (): Promise<iUser[] | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.users(),
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iUser[]>(error);
      console.error('getAllUsers -', throwError);
      return null;
    }
  },

  /* Получение статистики всех пользователей */
  getAllUsersStats: async (): Promise<iUserStats[] | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.allStats(),
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iUserStats[]>(error);
      console.error('getAllUsersStats -', throwError);
      return null;
    }
  },

  /* Создание пользователя */
  createUser: async (user: IUserRequest, token: string): Promise<iUsersResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.user(),
        data: user,
        params: { username: user.username },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iUsersResponse>(error);
    }
  },

  /* Обновление пользователя */
  updateUser: async (user: IUserRequest, token: string): Promise<iUsersResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.put,
        endpoint: requestsPath.user(),
        data: user,
        params: { username: user.username },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iUsersResponse>(error);
    }
  },

  /* Удаление пользователя */
  deleteUser: async (username: string, token: string): Promise<iUsersResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.delete,
        endpoint: requestsPath.user(),
        params: { username },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iUsersResponse>(error);
    }
  },

  /* Получение всех вопросов */
  getAllQuestions: async (): Promise<iQuestion[] | null> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.get,
        endpoint: requestsPath.questions(),
      });
      return response?.data;
    } catch (error: any) {
      const throwError = getReturnedError<iQuestion[]>(error);
      console.error('getAllQuestions -', throwError);
      return null;
    }
  },

  /* Создание вопроса */
  createQuestion: async (
    question: iQuestion,
    token: string,
  ): Promise<iQuestionResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: requestsPath.question(),
        data: question,
        params: { id: question.id },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iQuestionResponse>(error);
    }
  },

  /* Обновление вопроса */
  updateQuestion: async (
    question: iQuestion,
    token: string,
  ): Promise<iQuestionResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.put,
        endpoint: requestsPath.question(),
        data: question,
        params: { id: question.id },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iQuestionResponse>(error);
    }
  },

  /* Удаление вопроса */
  deleteQuestion: async (id: string, token: string): Promise<iQuestionResponse> => {
    try {
      const response = await sendRequest({
        method: TypeAxiosMethod.delete,
        endpoint: requestsPath.question(),
        params: { id },
        token,
      });

      return {
        status: 200,
        error: null,
        data: response?.data,
      };
    } catch (error: any) {
      return getReturnedError<iQuestionResponse>(error);
    }
  },
};
