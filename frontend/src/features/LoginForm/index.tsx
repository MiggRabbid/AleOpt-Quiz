// Библиотеки
import { Box, FormControl, Typography } from '@mui/material';
// Логика
import { useLoginForm } from './hooks';
import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnLogin } from './components';
import { CustomInput } from '@/shared/ui/inputs';

import { userRolesMap, type iResponseLogin } from '@/app/types';
import { useEffect } from 'react';

const LoginForm = () => {
  const { navigateTo } = useNavigate();
  const { updateUserData } = useAuthContext();

  const handleSuccess = (data: iResponseLogin) => {
    console.group('LoginForm / handleSuccess');
    console.log(data);
    if (data.role === userRolesMap.Admin || data.role === userRolesMap.Owner) {
      navigateTo({ to: routes.admin, replace: true });
    } else {
      navigateTo({ to: routes.main, replace: true });
    }
    updateUserData(data);
    console.groupEnd();
  };

  const { handleSubmit, onSubmit, errors, register, isFetching } = useLoginForm({
    handleSuccess,
  });

  useEffect(() => {
    console.log('LoginForm / isFetching -', isFetching);
  }, [isFetching]);

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
              disabled={isFetching}
            />
            <CustomInput
              type="password"
              label="Введите пароль"
              register={register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isFetching}
            />

            <Box className="w-full max-w-[400px]">
              <BtnLogin isSubmitting={isFetching} />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export { LoginForm };
