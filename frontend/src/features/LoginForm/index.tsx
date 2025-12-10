// Библиотеки
import { useEffect, useLayoutEffect, useState } from 'react';
import { Box, FormControl, Typography } from '@mui/material';
// Логика
import { useLoginForm } from './hooks';
// Компоненты
import { BtnLogin } from './components';
import { CustomInput } from '@/shared/ui/inputs';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, onSubmit, errors, register, isFetching, redirect } =
    useLoginForm();

  useLayoutEffect(() => {
    if (isFetching) setIsLoading(() => true);
    console.log('Login isFetching -', isFetching);
  }, [isFetching]);

  useLayoutEffect(() => {
    if (errors) setIsLoading(() => false);
    console.log('Login errors -', errors ?? 'нет ошибок');
  }, [errors]);

  // useEffect(() => {
  //   redirect((session?.user as any)?.role || '');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session]);

  return (
    <Box className="shadow-glass border-glass h-full max-h-[1080px] w-full max-w-lg overflow-hidden rounded-2xl border backdrop-blur-sm">
      <Box className="bg-glass h-full w-full">
        <Box className="flex h-full w-full flex-col items-center-safe justify-center-safe gap-10 px-6 py-12">
          <Typography
            component="h1"
            className="w-full text-center text-2xl! font-bold! uppercase"
          >
            Авторизуйтесь
          </Typography>

          <FormControl
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-[400px] flex-col gap-1!"
          >
            <CustomInput
              type="text"
              label="Введите логин"
              register={register('username')}
              error={!!errors.username}
              helperText={errors.username?.message}
              disabled={isFetching || isLoading}
            />
            <CustomInput
              type="password"
              label="Введите пароль"
              register={register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isFetching || isLoading}
            />

            <Box className="w-full max-w-[400px]">
              <BtnLogin isSubmitting={isFetching || isLoading} />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export { LoginForm };
