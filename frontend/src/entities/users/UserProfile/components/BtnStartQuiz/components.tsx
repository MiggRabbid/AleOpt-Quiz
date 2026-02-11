// Библиотеки
import { useLayoutEffect, useState, useTransition } from 'react';
import { Box, Typography } from '@mui/material';
// Логика
import { LocalKeyMap, useLocalStorage, useNavigate } from '@app/hooks';
import { routes } from '@/app/router';
// Компоненты
import { BtnMain } from '@/shared/ui/btns';

const BtnStartQuiz = () => {
  const { navigateTo } = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { getLocalData } = useLocalStorage();

  const [unfinishedAttempt, setUnfinishedAttempt] = useState<boolean>(false);

  useLayoutEffect(() => {
    const oldTimer = getLocalData<LocalKeyMap.TIMER>({ key: LocalKeyMap.TIMER });
    const oldResult = getLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT });

    if (!!oldTimer || !!oldResult) {
      setUnfinishedAttempt(true);
    } else {
      setUnfinishedAttempt(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelClickBtn = () => {
    startTransition(() => {
      navigateTo({ to: routes.quiz });
    });
  };

  return (
    <Box className="flex flex-col justify-end">
      <Typography
        align="center"
        className="mb-2! w-full! text-base! font-semibold! uppercase"
      >
        {unfinishedAttempt ? 'Найден незавершённый тест' : 'Попробуешь еще раз?'}
      </Typography>
      <BtnMain
        btnText={unfinishedAttempt ? 'Продолжить тест' : 'Начать тест'}
        btnClick={handelClickBtn}
        fullWidth
        isLoading={isPending}
        color={unfinishedAttempt ? 'warning' : 'success'}
      />
    </Box>
  );
};

export { BtnStartQuiz };
