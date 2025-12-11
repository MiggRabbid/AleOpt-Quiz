import type { iHandledError } from '@/app/types';

export const getHandledError = (error: any): iHandledError => {
  const errorData: iHandledError = {
    status: 500,
    message: 'Непредвиденная ошибка',
    errorType: 'Unknown error type',
  };

  if (error?.response?.data?.message) {
    errorData.status = error.response.status;
    errorData.message = error.response.data.message;
  }

  if (error?.response?.data?.errorType) {
    errorData.status = error.response.status;
    errorData.errorType = error.response.data.errorType;
  }

  return errorData;
};
