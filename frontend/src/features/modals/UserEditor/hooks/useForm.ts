// Библиотеки
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
// Логика
import { getUserSchema } from '../config/schema';
import { useCreateUser, useEditUser } from '@/app/api/hooks';
import { useAppActions, useAvatars } from '@app/hooks';
// Типизация
import {
  type iHandledError,
  type IUserRequest,
  type iUserStats,
  UserGender,
  UserRoles,
  UserStatus,
} from '@app/types';
import type { FormData } from '../config/schema';
import type { AxiosError } from 'axios';

interface IUseUserFormProps {
  isNewUser: boolean;
  requiredPass: boolean;
  editableUserImage?: string;
}

export const useUserForm = (props: IUseUserFormProps) => {
  const { isNewUser, requiredPass, editableUserImage } = props;
  const { getNewRandomAvatar } = useAvatars();
  const { enqueueSnackbar } = useSnackbar();

  const { setQuizStateField, closeUserEditor } = useAppActions();

  const { mutateAsync: createUser } = useCreateUser({
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => handleError(error),
  });

  const { mutateAsync: editUser } = useEditUser({
    onSuccess: (data) => handleSuccess(data),
    onError: (error) => handleError(error),
  });

  const userSchema = getUserSchema(requiredPass);

  const [savingAvailable, setSavingAvailable] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: UserRoles.Employee,
      gender: UserGender.female,
      status: UserStatus.Active,
    },
  });

  const username = watch('username');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const password = watch('password');
  const role = watch('role');
  const gender = watch('gender');
  const status = watch('status');
  const image = watch('image');

  useLayoutEffect(() => {
    if (!editableUserImage || editableUserImage.length === 0) {
      const newImage = getNewRandomAvatar(gender);
      setValue('image', newImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const usernameIsEmpty = !username || username.length === 0;
    const firstNameIsEmpty = !firstName || firstName.length === 0;
    const lastNameIsEmpty = !lastName || lastName.length === 0;
    const passwordIsEmpty = requiredPass
      ? !password || password.length === 0
      : requiredPass;
    const roleIsEmpty = !role || role.length === 0;
    const genderIsEmpty = !gender || gender.length === 0;
    const statusIsEmpty = !status || status.length === 0;
    const imageEmpty = !image || image.length === 0;

    setSavingAvailable(
      !usernameIsEmpty &&
        !firstNameIsEmpty &&
        !lastNameIsEmpty &&
        !passwordIsEmpty &&
        !roleIsEmpty &&
        !genderIsEmpty &&
        !statusIsEmpty &&
        !imageEmpty,
    );
  }, [
    username,
    firstName,
    lastName,
    password,
    requiredPass,
    role,
    gender,
    status,
    image,
  ]);

  const onSubmit = async (user: FormData) => {
    setIsFetching(true);
    const query: IUserRequest = {
      role: user.role,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      gender: user.gender,
      status: user.status,
    };

    if (!!user.password && user.password.length > 0) {
      query.password = user.password;
    }

    if (isNewUser) {
      createUser({ params: { username: user.username }, query });
    }

    if (!isNewUser) {
      editUser({ params: { username: user.username }, query });
    }
  };

  const handleSuccess = (data: iUserStats[]) => {
    if (isNewUser) {
      enqueueSnackbar('Пользователь создан', { variant: 'success' });
    } else {
      enqueueSnackbar('Пользователь обновлён', { variant: 'success' });
    }
    setQuizStateField({ field: 'users', data });
    closeUserEditor();
    setIsFetching(false);
  };

  const handleError = (error: AxiosError<iHandledError, any>) => {
    const userExists = error.response?.data.errorType === 'userExists';
    setError('username', {
      message: userExists
        ? 'Такой пользователь уже существует'
        : error.response?.data.message,
    });

    setError('lastName', { message: ' ' });
    setError('username', { message: ' ' });
    setError('password', { message: ' ' });
    setIsFetching(false);
  };

  return {
    savingAvailable,
    setValue,
    watch,
    register,
    handleSubmit,
    errors,
    isSubmitting: isFetching,
    onSubmit,
  };
};
