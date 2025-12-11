import { useMutation } from '@tanstack/react-query';

import {
  TypeAxiosMethod,
  REQUEST_PATHS,
  sendRequest,
  type CustomHookMutationOptions,
} from '@api/index';

import type { AxiosError } from 'axios';
import type { iRequestLogin, IResponseError, iResponseLogin } from '@/app/types';
/**
 * Авторизация
 */
export const useAuth = (
  options?: CustomHookMutationOptions<iResponseLogin, iRequestLogin>,
) => {
  return useMutation<iResponseLogin, AxiosError<IResponseError>, iRequestLogin>({
    mutationFn: async (payload) => {
      return sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: REQUEST_PATHS.login(),
        data: payload,
      });
    },
    ...options,
  });
};
