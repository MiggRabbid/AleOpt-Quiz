import { BtnMain } from '@/shared/ui/btns';
import { Box, Typography } from '@mui/material';
import { CatchBoundary, useRouter } from '@tanstack/react-router';

export type LayoutErrorRouterProps = object;

const ErrorPage = () => {
  const router = useRouter();

  const logError = (error: unknown) => {
    console.group('logError:');
    console.error(error);
    console.groupEnd();
  };

  return (
    <CatchBoundary getResetKey={() => 'reset'} onCatch={logError}>
      <Box className="flex min-h-full w-full flex-col items-center justify-center gap-10 p-10!">
        <Typography component={'p'} className="text-md text-center font-bold">
          Произошла неизвестная ошибка. Пожалуйста, попробуйте позже.
        </Typography>

        <BtnMain
          btnText={'Вернуться на главную'}
          btnClick={() => router.invalidate()}
        ></BtnMain>
      </Box>
    </CatchBoundary>
  );
};

export default ErrorPage;
