import { iHandledError } from '@/types/staff.types';

export const getHandledError = (error: any): iHandledError => {
  console.group('----- getHandledError');
  console.log(error);

  const errorData: iHandledError = {
    message: 'Unknown error',
    errorType: 'Unknown error type',
  };

  if (error?.response?.data?.message || error?.response?.data?.errorType) {
    console.groupEnd();
    return {
      message: error.response.data.message,
      errorType: error.response.data.errorType,
    };
  }

  return errorData;
};
