import {
  MutationCache,
  QueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { IResponseError } from '../types';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError(error, _variables, _context, mutation) {
      if (mutation.options.meta?.skipGlobalErrorHandler) return;
      if (error) throw error;
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000,
    },
  },
});

export type CustomHookMutationOptions<
  TData = unknown,
  TError = AxiosError<IResponseError>,
  TVariables = void,
> = Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
