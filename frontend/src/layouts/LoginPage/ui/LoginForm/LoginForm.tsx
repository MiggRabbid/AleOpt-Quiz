'use client';
// Библиотеки
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Box, FormControl, Typography } from '@mui/material';
// Логика
import { useLoginForm } from './hooks/useForm';
// Компоненты
import { CustomInput } from '@/shared/ui/ui/inputs/CustomInput';
import { BtnLogin } from './ui/BtnLogin';

const LoginForm = () => {
  const { data: session } = useSession();

  const { handleSubmit, onSubmit, errors, register, isSubmitting, redirect } =
    useLoginForm();

  useEffect(() => {
    redirect((session?.user as any)?.role || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Box className="shadow-main flex w-full max-w-xl flex-col gap-10 rounded-2xl px-9 py-12">
      <Typography
        component="h1"
        className="w-full text-center text-2xl! font-bold! uppercase"
      >
        Авторизуйтесь
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-1!"
      >
        <CustomInput
          type="text"
          label="Введите логин"
          register={register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <CustomInput
          type="password"
          label="Введите пароль"
          register={register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <BtnLogin isSubmitting={isSubmitting} />
      </FormControl>
    </Box>
  );
};

export { LoginForm };
