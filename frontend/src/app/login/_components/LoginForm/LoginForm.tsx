'use client';

import { CustomInput } from '@/components/ui/inputs/CustomInput';
import { Box, FormControl, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useLoginForm } from './hooks/useForm';
import { BtnLogin } from '@/components/ui/btns/BtnLogin/BtnLogin';

const LoginForm = () => {
  const { data: session } = useSession();

  const { handleSubmit, onSubmit, errors, register, isSubmitting, redirect } =
    useLoginForm();

  useEffect(() => {
    redirect((session?.user as any)?.role || '');
  }, [session]);

  return (
    <Box className="flex flex-col w-full gap-10 rounded-2xl px-9 py-12 shadow-main">
      <Typography
        component="h1"
        className="w-full text-center uppercase text-2xl! font-bold!"
      >
        Авторизуйтесь
      </Typography>
      <FormControl
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-1!"
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
