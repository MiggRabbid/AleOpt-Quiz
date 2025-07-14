import { iHandledError } from '@/types/staff.types';

export const getHandledError = (error: any): iHandledError => {
  const errorData: iHandledError = {
    message: 'Unknown error',
    errorType: 'Unknown error type',
  };

  if (error?.response?.data?.message || error?.response?.data?.errorType) {
    return {
      message: error.response.data.message,
      errorType: error.response.data.errorType,
    };
  }

  return errorData;
};

export const getReturnedError = <T>(error: any): T => {
  return {
    status: error.status,
    error: getHandledError(error),
    data: null,
  } as T;
};
