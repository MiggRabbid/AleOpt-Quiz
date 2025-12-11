import { useMutation } from '@tanstack/react-query';

import { TypeAxiosMethod, REQUEST_PATHS, sendRequest } from '@api/index';

import type { CustomHookMutationOptions } from '@api/index';
import type { iHandledError } from '@/app/types';
import type { AxiosError } from 'axios';
import type { iRequestLogin, iResponseLogin } from '@/app/types';

/**
 * Авторизация
 */
export const useCrateUser = (
  options?: CustomHookMutationOptions<iResponseLogin, iRequestLogin>,
) => {
  return useMutation<iResponseLogin, AxiosError<iHandledError>, iRequestLogin>({
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
