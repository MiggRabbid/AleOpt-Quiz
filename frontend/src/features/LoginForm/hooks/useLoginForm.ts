// Библиотеки
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Логика
import { schema } from '../config';
import { useAuth } from '@/app/api/hooks';

import type { FormData } from '../config';
import type { iHandledError, iResponseLogin } from '@/app/types';
import type { AxiosError } from 'axios';

interface IUseLoginFormProps {
  handleSuccess: (data: iResponseLogin) => void;
}

export const useLoginForm = ({ handleSuccess }: IUseLoginFormProps) => {
  const { mutateAsync } = useAuth({
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => onError(error),
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading, isDirty, isValid },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoading || isSubmitting) setIsFetching(true);
  }, [isSubmitting, isLoading]);

  const onSubmit = async ({ username, password }: FormData) => {
    mutateAsync({ username, password });
  };

  const onError = (error: AxiosError<iHandledError, any>) => {
    if (error.response?.data.errorType === 'userNotFound') {
      setError('username', { message: error.response?.data.message });
    } else if (error.response?.data.errorType === 'incorrectPassword') {
      setError('password', { message: error.response?.data.message });
    } else {
      setError('username', { message: error.response?.data.message });
      setError('username', { message: '' });
    }
    setIsFetching(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isFetching,
    isValid,
    isDirty,
  };
};
