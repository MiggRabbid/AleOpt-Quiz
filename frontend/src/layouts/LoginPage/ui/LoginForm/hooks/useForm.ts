import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!role) return;
    switch (role) {
      case 'Admin':
      case 'Owner':
        router.replace(routes.admin);
        break;
      default:
        router.replace(routes.profile);
    }
  };

  return { register, handleSubmit, errors, isFetching, onSubmit, redirect };
};
