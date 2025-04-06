'use client';
// Библиотеки
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
// Логика
import { routes } from '@/app/_config/routes';
// Компоненты
import { BtmMain } from '@/components/ui/btns/BtnMain/BtmMain';
import { useLocalStorage } from '@/hooks';

const BtnStartQuiz = () => {
  const router = useRouter();
  const { getResult } = useLocalStorage();

  const unfinishedAttempt = getResult();

  const handelClickBtn = () => {
    router.push(routes.quiz);
  };

  return (
    <Box className="flex flex-col justify-end">
      {!unfinishedAttempt ? (
        <BtmMain btnText="Начать тест" btnClick={handelClickBtn} fullWidth />
      ) : (
        <>
          <Typography
            align="center"
            className="mb-2! w-full! text-base! font-semibold! uppercase"
          >
            Найден незавершённый тест
          </Typography>
          <BtmMain
            btnText="Продолжить тест"
            btnClick={handelClickBtn}
            fullWidth
            color="warning"
          />
        </>
      )}
    </Box>
  );
};

export { BtnStartQuiz };
