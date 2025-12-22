import { keepPreviousData, queryOptions, useMutation } from '@tanstack/react-query';

import { useAuthContext } from '@app/hooks';
import {
  TypeAxiosMethod,
  REQUEST_PATHS,
  sendRequest,
  queryKeys,
  queryClient,
} from '@app/api';

import type { AxiosError } from 'axios';
import type { CustomHookMutationOptions } from '@app/api';
import type {
  IEditUserDataRequest,
  IGetUserDataRequest,
  iHandledError,
  iResultEntryRequest,
  IUserRequest,
  iUserStats,
} from '@app/types';

/**
 * Получение данных пользователя
 */
export const useGetCurrentUser = (props: IGetUserDataRequest) => {
  const { token } = useAuthContext();

  return queryOptions({
    queryKey: [queryKeys.users.one],
    placeholderData: keepPreviousData,
    queryFn: () =>
      sendRequest<IUserRequest, IGetUserDataRequest>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.user(),
        params: props.params,
        token: token,
      }).then((res) => res),
    retry: false,
  });
};

/**
 * Получение данных всех пользователей
 */
export const useGetAllUsers = () => {
  const { token } = useAuthContext();

  return queryOptions({
    queryKey: [queryKeys.users.all],
    placeholderData: keepPreviousData,
    queryFn: () =>
      sendRequest<iUserStats>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.users(),
        token: token,
      }).then((res) => res),
    retry: false,
  });
};

/**
 * Получение статистики пользователя
 */
export const useGetUserStats = (props: IGetUserDataRequest) => {
  const { token } = useAuthContext();

  return queryOptions({
    queryKey: [queryKeys.users.stats],
    placeholderData: keepPreviousData,
    queryFn: () =>
      sendRequest<iUserStats, IGetUserDataRequest>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.userStats(),
        params: props.params,
        token: token,
      }).then((res) => res),
    retry: false,
  });
};

/**
 * Сохранение результатов пользователя
 */
export const useUpdateUserStats = (
  options?: CustomHookMutationOptions<
    iUserStats,
    IEditUserDataRequest<iResultEntryRequest>
  >,
) => {
  const { token } = useAuthContext();

  return useMutation<
    iUserStats,
    AxiosError<iHandledError>,
    IEditUserDataRequest<iResultEntryRequest>
  >({
    mutationFn: async (payload) => {
      return sendRequest({
        method: TypeAxiosMethod.post,
        endpoint: REQUEST_PATHS.userStats(),
        data: payload.query,
        params: payload.params,
        token: token,
      });
    },
    ...options,
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [queryKeys.users.all],
        }),
        queryClient.invalidateQueries({
          queryKey: [queryKeys.users.stats],
        }),
      ]);
    },
  });
};
