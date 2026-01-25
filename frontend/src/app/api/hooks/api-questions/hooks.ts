import { keepPreviousData, queryOptions, useMutation } from '@tanstack/react-query';

import { useAuthContext } from '@app/hooks';
import {
  queryKeys,
  sendRequest,
  REQUEST_PATHS,
  TypeAxiosMethod,
  queryClient,
} from '@app/api';

import type { CustomHookMutationOptions } from '@app/api';
import type {
  IEditQuestionRequest,
  iHandledError,
  iQuestion,
  IQuestionRequest,
} from '@app/types';
import type { AxiosError } from 'axios';

/**
 * Получение всех вопросов
 */
export const useGetAllQuestions = () => {
  const { token } = useAuthContext();

  return queryOptions({
    queryKey: [queryKeys.questions.all],
    placeholderData: keepPreviousData,
    queryFn: () =>
      sendRequest<iQuestion[]>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.questions(),
        token: token,
      }).then((res) => res),
    retry: false,
  });
};

/**
 * Создание нового вопроса
 */
export const useCreateQuestion = (
  options?: CustomHookMutationOptions<iQuestion[], IEditQuestionRequest>,
) => {
  const { token } = useAuthContext();

  return useMutation<iQuestion[], AxiosError<iHandledError>, IEditQuestionRequest>({
    mutationFn: async (payload) => {
      return sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: REQUEST_PATHS.question(),
        data: payload.query,
        params: payload.params,
        token: token,
      });
    },
    ...options,
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.questions.all],
        }),
      ]);
    },
  });
};

/**
 * Редактирование вопроса
 */
export const useEditQuestion = (
  options?: CustomHookMutationOptions<iQuestion[], IEditQuestionRequest>,
) => {
  const { token } = useAuthContext();

  return useMutation<iQuestion[], AxiosError<iHandledError>, IEditQuestionRequest>({
    mutationFn: async (payload) => {
      return sendRequest({
        method: TypeAxiosMethod.put,
        endpoint: REQUEST_PATHS.question(),
        data: payload.query,
        params: payload.params,
        token: token,
      });
    },
    ...options,
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.questions.all],
        }),
      ]);
    },
  });
};

/**
 * Удаление вопроса
 */
export const useDeleteQuestion = (
  options?: CustomHookMutationOptions<iQuestion[], IQuestionRequest>,
) => {
  const { token } = useAuthContext();

  return useMutation<iQuestion[], AxiosError<iHandledError>, IQuestionRequest>({
    mutationFn: async (payload) => {
      return sendRequest({
        method: TypeAxiosMethod.delete,
        endpoint: REQUEST_PATHS.question(),
        params: payload.params,
        token: token,
      });
    },
    ...options,
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.questions.all],
        }),
      ]);
    },
  });
};
