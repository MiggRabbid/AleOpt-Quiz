import {
  MutationCache,
  QueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';

import { getHandledError } from './query.service';

import type { iHandledError } from '@/app/types';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError(error, _variables, _context, _mutation) {
      const preparedError = getHandledError(error);
      enqueueSnackbar(preparedError.message, {
        variant: 'error',
      });

      return preparedError;
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 100000,
    },
  },
});

export type CustomHookMutationOptions<
  TData = unknown,
  TVariables = void,
  TError = AxiosError<iHandledError>,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;
