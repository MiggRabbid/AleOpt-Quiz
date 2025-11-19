// Библиотеки
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
// Логика
import { api } from '@/shared/api';
import { FormData, getUserSchema } from '../config/schema';
import { useAppActions } from '@/hooks';
// Типизация
import { IUserRequest, UserGender, UserRoles } from '@/types/staff.types';

interface IUseUserFormProps {
  isNewUser: boolean;
  requiredPass: boolean;
  editableUser: string | null;
}

export const useUserForm = (props: IUseUserFormProps) => {
  const { isNewUser, requiredPass, editableUser } = props;

  const { setQuizStateField, closeUserEditor } = useAppActions();

  const { data } = useSession();
  const token = data?.user?.token;
  const userSchema = getUserSchema(requiredPass);

  const [savingAvailable, setSavingAvailable] = useState<boolean>(false);

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const username = watch('username');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const password = watch('password');
  const role = watch('role');
  const gender = watch('gender');
  const image = watch('image');

  useEffect(() => {
    const usernameIsEmpty = !username || username.length === 0;
    const firstNameIsEmpty = !firstName || firstName.length === 0;
    const lastNameIsEmpty = !lastName || lastName.length === 0;
    const passwordIsEmpty = requiredPass
      ? !password || password.length === 0
      : requiredPass;
    const roleIsEmpty = !role || role.length === 0;
    const genderIsEmpty = !gender || gender.length === 0;
    const imageEmpty = !image || image.length === 0;

    setSavingAvailable(
      !usernameIsEmpty &&
        !firstNameIsEmpty &&
        !lastNameIsEmpty &&
        !passwordIsEmpty &&
        !roleIsEmpty &&
        !genderIsEmpty &&
        !imageEmpty,
    );
  }, [username, firstName, lastName, password, requiredPass, role, gender, image]);

  const onSubmit = async (user: FormData) => {
    const { createUser, updateUser } = api;

    if (!token) return;

    if (isNewUser) {
      const response = await createUser(user as unknown as IUserRequest, token);

      if (response.data) {
        setQuizStateField({ field: 'users', data: response.data });
        closeUserEditor();
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
      const response = await updateUser(
        editableUser,
        user as unknown as IUserRequest,
        token,
      );

      if (response.data) {
        setQuizStateField({ field: 'users', data: response.data });
        closeUserEditor();
      }

      if (!response.data) {
        setError('firstName', { message: 'Ошибка создания, проверьте данные' });
        setError('lastName', { message: ' ' });
        setError('username', { message: ' ' });
        setError('password', { message: ' ' });
      }
    }
  };

  return {
    savingAvailable,
    setValue,
    watch,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
};
