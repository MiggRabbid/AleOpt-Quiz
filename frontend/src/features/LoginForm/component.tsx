// Библиотеки
import { Box, FormControl, Typography } from '@mui/material';
// Логика
import { useLoginForm } from './hooks';
import { useAuthContext, useNavigate } from '@app/hooks';
import { routes } from '@app/router';
// Компоненты
import { BtnLogin } from './components';
import { CustomInput } from '@/shared/ui/inputsAnsSelects';
// Типизация
import { userRolesMap, type iResponseLogin } from '@/app/types';

const LoginForm = () => {
  const { navigateTo } = useNavigate();
  const { updateUserData } = useAuthContext();

  const handleSuccess = (data: iResponseLogin) => {
    if (data.role === userRolesMap.Admin || data.role === userRolesMap.Owner) {
      navigateTo({ to: routes.admin, replace: true });
    } else {
      navigateTo({ to: routes.main, replace: true });
    }
    updateUserData(data);
  };

  const { handleSubmit, onSubmit, errors, register, isFetching, isValid } = useLoginForm({
    handleSuccess,
  });

  return (
    <Box className="shadow-glass border-glass h-full max-h-[1080px] w-full max-w-lg overflow-hidden rounded-2xl border backdrop-blur-sm">
      <Box className="bg-glass flex h-full w-full flex-col items-center-safe justify-center-safe gap-6">
        <Box className="flex h-fit w-full shrink-0 grow-0 items-center-safe justify-center-safe pt-20">
          <img
            src="/assets/images/logo.png"
            alt="АлёОпт"
            width={'50%'}
            className="text-sm"
          />
        </Box>

        <Box className="flex h-full w-full grow-1 flex-col items-center-safe justify-center-safe gap-10 px-6 pt-6 pb-12">
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
              <BtnLogin isSubmitting={isFetching} isDisabled={!isValid} />
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export { LoginForm };
