import { CustomInput } from '@/components/ui/inputs/CustomInput';
import { Box, Typography } from '@mui/material';

const LoginForm = () => {
  return (
    <Box className="flex flex-col w-full gap-10 rounded-2xl px-9 py-12 shadow-main">
      <Typography
        component="h1"
        className="w-full text-center uppercase text-2xl! font-bold!"
      >
        Авторизуйтесь
      </Typography>
      <CustomInput type="text" label="Введите логин" />
      <CustomInput type="password" label="Введите пароль" />
    </Box>
  );
};

export { LoginForm };
