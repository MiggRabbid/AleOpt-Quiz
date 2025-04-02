import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { FormData, schema } from '../config/schema';

export const useLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    // router.push('/');
    if (response?.error) {
      console.error('Ошибка авторизации -', response);
      setError('username', { message: 'Пользователь не найден' });
      setError('password', { message: 'Или неправильный пароль' });
      console.error('Ошибка авторизации -', response.error);
    }
  };

  const redirect = (role: any) => {
    if (!!role && role === 'Employee') {
      router.push('/');
    }
    if (!!role && role !== 'Admin') {
      router.push('/admin');
    }
    if (!!role && role !== 'Owner') {
      router.push('/admin');
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit, redirect };
};
