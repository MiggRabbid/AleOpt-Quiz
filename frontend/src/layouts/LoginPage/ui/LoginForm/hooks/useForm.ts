import { useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FormData, schema } from '../config/schema';
import { routes } from '@/shared/config/routes';

export const useLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isSubmitting || isLoading) setIsFetching(true);
  }, [isSubmitting, isLoading]);

  const onSubmit = async (data: FormData) => {
    const response = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (response?.error) {
      setIsFetching(false);
      setError('username', { message: 'Пользователь не найден' });
      setError('password', { message: 'Или неправильный пароль' });
    }
  };

  const redirect = (role: string) => {
    setIsFetching(false);
    switch (role) {
      case 'Employee':
        router.push(routes.main);
        break;
      case 'Admin':
      case 'Owner':
        router.push(routes.admin);
        break;
      default:
        router.push(routes.main); // fallback
    }
  };

  return { register, handleSubmit, errors, isFetching, onSubmit, redirect };
};
