'use client';
// Библиотеки
import { useLayoutEffect, useState, useTransition } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
// Логика
import { routes } from '@/shared/config/routes';
import { useLocalStorage } from '@/hooks';
// Компоненты
import { BtnMain } from '@/shared/ui/ui/btns';

const BtnStartQuiz = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { getResult, getTimer } = useLocalStorage();
  const [unfinishedAttempt, setUnfinishedAttempt] = useState<boolean>(false);

  useLayoutEffect(() => {
    const oldTimer = getTimer();
    const oldResult = getResult();

    if (!!oldTimer && !!oldResult) {
      setUnfinishedAttempt(true);
    } else {
      setUnfinishedAttempt(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelClickBtn = () => {
    startTransition(() => {
      router.push(routes.quiz);
    });
  };

  return (
    <Box className="flex flex-col justify-end">
      {!unfinishedAttempt ? (
        <>
          <Typography
            align="center"
            className="mb-2! w-full! text-base! font-semibold! uppercase"
          >
            Попробуешь еще раз?
          </Typography>
          <BtnMain
            btnText="Начать тест"
            btnClick={handelClickBtn}
            fullWidth
            isLoading={isPending}
          />
        </>
      ) : (
        <>
          <Typography
            align="center"
            className="mb-2! w-full! text-base! font-semibold! uppercase"
          >
            Найден незавершённый тест
          </Typography>
          <BtnMain
            btnText="Продолжить тест"
            btnClick={handelClickBtn}
            fullWidth
            isLoading={isPending}
            color="warning"
          />
        </>
      )}
    </Box>
  );
};

export { BtnStartQuiz };
