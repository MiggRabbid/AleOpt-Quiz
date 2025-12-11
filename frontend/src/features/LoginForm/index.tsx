// Библиотеки
import { Box, FormControl, Typography } from '@mui/material';
import { Navigate, useNavigate } from '@tanstack/react-router';
// Логика
import { useLoginForm } from './hooks';
import { LocalKeyMap, useLocalStorage } from '@/app/hooks';
import { routes } from '@/app/router/routes';
// Компоненты
import { BtnLogin } from './components';
import { CustomInput } from '@/shared/ui/inputs';

import type { iResponseLogin } from '@/app/types';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setLocalData } = useLocalStorage<LocalKeyMap.USER>();

  const handleSuccess = (data: iResponseLogin) => {
    setLocalData({
      key: LocalKeyMap.USER,
      data,
    });
    navigate({ to: routes.main, replace: true });
  };

  const { handleSubmit, onSubmit, errors, register, isLoading } = useLoginForm({
    handleSuccess,
  });

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
              disabled={isLoading}
            />
            <CustomInput
              type="password"
              label="Введите пароль"
              register={register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
            />

            <Box className="w-full max-w-[400px]">
              <BtnLogin isSubmitting={isLoading} />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export { LoginForm };
