import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import { useAuthContext } from '@app/hooks';
import { TypeAxiosMethod, REQUEST_PATHS, sendRequest, queryKeys } from '@api/index';

import type { IGetUserDataRequest, IUserRequest, iUserStats } from '@app/types';

/**
 * Получение данных пользователя
 */
export const useGetCurrentUser = (props: IGetUserDataRequest) => {
  const { token } = useAuthContext();

  return queryOptions({
    queryKey: [queryKeys.users.one],
    placeholderData: keepPreviousData,
    queryFn: () =>
      sendRequest<IUserRequest, IGetUserDataRequest['query']>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.user(),
        params: props.query,
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
      sendRequest<iUserStats, IGetUserDataRequest['query']>({
        method: TypeAxiosMethod.get,
        endpoint: REQUEST_PATHS.userStats(),
        params: props.query,
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
