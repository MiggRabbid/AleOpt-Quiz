import { useMutation } from '@tanstack/react-query';

import { TypeAxiosMethod, REQUEST_PATHS, sendRequest } from '@api/index';

import type { AxiosError } from 'axios';
import type { CustomHookMutationOptions } from '@api/index';
import type { iRequestLogin, IResponseError, iResponseLogin } from '@/app/types';
/**
 * Авторизация
 */
export const useAuth = () => {
  return useMutation<iResponseLogin, AxiosError<IResponseError>, iRequestLogin>({
    mutationFn: async ({ username, password }) => {
      return sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: REQUEST_PATHS.login(),
        data: { username, password },
      });
    },
  });
};
