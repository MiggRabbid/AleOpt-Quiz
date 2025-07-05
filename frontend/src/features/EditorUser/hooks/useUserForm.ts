import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, getUserSchema } from '../config/schema';
import { UserRoles } from '@/types/staff.types';
import { api } from '@/shared/api/api';

export const useUserForm = (isNewUser: boolean) => {
  const userSchema = getUserSchema(isNewUser);

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userRole: UserRoles.Employee,
    },
  });

  const onSubmit = async (data: FormData) => {
    const {} = api;
    if (isNewUser) {
    }
    if (!isNewUser) {
    }
    const response = await signIn('credentials', {
      redirect: false,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      userRole: data.userRole,
    });

    if (response?.error) {
      console.error('Ошибка авторизации -', response);
      setError('username', { message: 'Проверьте введенные данные' });
      setError('password', { message: 'Проверьте введенные данные' });
      setError('firstname', { message: 'Проверьте введенные данные' });
      setError('lastname', { message: 'Проверьте введенные данные' });
      setError('userRole', { message: 'Проверьте введенные данные' });
      console.error('Ошибка авторизации -', response.error);
    }
  };

  return { setValue, watch, register, handleSubmit, errors, isSubmitting, onSubmit };
};
