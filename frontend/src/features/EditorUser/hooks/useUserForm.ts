import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, getUserSchema } from '../config/schema';
import { IUserRequest, UserGender, UserRoles } from '@/types/staff.types';
import { api } from '@/shared/api/api';
import { useSession } from 'next-auth/react';
import { useAppActions } from '@/hooks';

interface IUseUserFormProps {
  isNewUser: boolean;
  requiredPass: boolean;
}

export const useUserForm = (props: IUseUserFormProps) => {
  const { isNewUser, requiredPass } = props;

  const { setQuizStateField } = useAppActions();

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
    const { createUser, updateUser } = api;

    if (!token) return;

    if (isNewUser) {
      const response = await createUser(user as unknown as IUserRequest, token);

      if (response.data) {
        setQuizStateField({ field: 'users', data: response.data });
      }

      if (!response.data) {
        const userExists = response.error?.errorType === 'userExists';
        setError('username', {
          message: userExists ? 'Такой пользователь уже существует' : ' ',
        });
        setError('firstName', { message: ' ' });
        setError('lastName', { message: ' ' });
        setError('password', { message: ' ' });
      }
    }

    if (!isNewUser) {
      const response = await updateUser(user as unknown as IUserRequest, token);

      if (response.data) {
        setQuizStateField({ field: 'users', data: response.data });
      }

      if (!response.data) {
        setError('firstName', { message: 'Ошибка создания, проверьте данные' });
        setError('lastName', { message: ' ' });
        setError('username', { message: ' ' });
        setError('password', { message: ' ' });
      }
    }
  };

  return { setValue, watch, register, handleSubmit, errors, isSubmitting, onSubmit };
};
