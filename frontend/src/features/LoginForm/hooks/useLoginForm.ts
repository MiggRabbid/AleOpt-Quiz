import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema } from '../config';
import { useAuth } from '@/app/api/hooks';

import type { FormData } from '../config';
import type { iResponseLogin } from '@/app/types';
import { useEffect, useState } from 'react';

interface IUseLoginFormProps {
  handleSuccess: (data: iResponseLogin) => void;
}

export const useLoginForm = ({ handleSuccess }: IUseLoginFormProps) => {
  const { mutateAsync } = useAuth({
    onSuccess: (data) => handleSuccess(data),
    onError: () => onError(),
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoading || isSubmitting) setIsFetching(true);
  }, [isSubmitting, isLoading]);

  useEffect(() => {
    console.log('useLoginForm / isLoading -', isLoading);
  }, [isLoading]);

  const onSubmit = async ({ username, password }: FormData) => {
    mutateAsync({ username, password });
  };

  const onError = () => {
    console.group('onError');
    setError('username', { message: 'Пользователь не найден' });
    setError('password', { message: 'Или неправильный пароль' });
    setIsFetching(false);
    console.groupEnd();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isFetching,
  };
};
