import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, getUserSchema } from '../config/schema';
import { IUserRequest, UserGender, UserRoles } from '@/types/staff.types';
import { api } from '@/shared/api/api';
import { useSession } from 'next-auth/react';

interface IUseUserFormProps {
  isNewUser: boolean;
  requiredPass: boolean;
}

export const useUserForm = (props: IUseUserFormProps) => {
  const { isNewUser, requiredPass } = props;

  const { data } = useSession();
  const token = data?.user?.token;
  const userSchema = getUserSchema(requiredPass);

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
      role: UserRoles.Employee,
      gender: UserGender.female,
    },
  });

  const onSubmit = async (user: FormData) => {
    console.group('----- onSubmit');
    console.log('user -', user);
    console.groupEnd();
    const { createUser } = api;

    if (!token) {
      return;
    }

    if (isNewUser) {
      const response = await createUser(user as unknown as IUserRequest, token);
      console.log('response -', response);
    }
    if (!isNewUser) {
    }

    // const response = await signIn('credentials', {
    //   redirect: false,
    //   firstname: data.firstname,
    //   lastname: data.lastname,
    //   username: data.username,
    //   password: data.password,
    //   userRole: data.userRole,
    // });

    // if (response?.error) {
    //   console.error('Ошибка авторизации -', response);
    //   setError('username', { message: 'Проверьте введенные данные' });
    //   setError('password', { message: 'Проверьте введенные данные' });
    //   setError('firstname', { message: 'Проверьте введенные данные' });
    //   setError('lastname', { message: 'Проверьте введенные данные' });
    //   setError('userRole', { message: 'Проверьте введенные данные' });
    //   console.error('Ошибка авторизации -', response.error);
    // }
  };

  return { setValue, watch, register, handleSubmit, errors, isSubmitting, onSubmit };
};
