'use client';
// Библиотеки
import { useState, useTransition } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { BtnMain } from '@/shared/ui/ui/btns';
import { useSession } from 'next-auth/react';
// Логика
import { routes } from '@/shared/config/routes';
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { api } from '@/shared/api/api';
// Компоненты
import { getFormattedDate } from '@/shared/lib/getFormattedDate';
// Типизация
import { iResultEntryRequest } from '@/types/staff.types';

const BtnEndQuiz = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { delResult, delTimer } = useLocalStorage();

  const { clearResultState } = useAppActions();
  const currentResult = useAppSelector(getQuizStateField('currentResult'));
  const isStarted = useAppSelector(getQuizStateField('isStarted'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handelClickSaveBtn = async () => {
    setIsFetching(true);

    const username = session?.user.username;
    const token = session?.user.token;

    if (!username || !token) {
      setIsFetching(false);
      return;
    }

    try {
      const data: iResultEntryRequest = {
        data: getFormattedDate(),
        answers: currentResult,
      };

      await api.addUserStats({
        data,
        token,
        params: {
          username,
        },
      });

      delResult();
      delTimer();
      clearResultState();
      startTransition(() => {
        router.push(routes.main);
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  const handelClickEndBtn = () => {
    startTransition(() => {
      router.push(routes.main);
    });
    delResult();
    delTimer();
  };

  return (
    <Box className="flex flex-col justify-end">
      {allQuestionsCompleted && (
        <BtnMain
          btnText="Сохранить результат?"
          btnClick={handelClickSaveBtn}
          isLoading={isFetching || isPending}
          fullWidth
        />
      )}

      {isStarted && !allQuestionsCompleted && (
        <BtnMain
          btnText="Закончить попытку?"
          btnClick={handelClickEndBtn}
          isLoading={isFetching || isPending}
          fullWidth
          color="warning"
        />
      )}
    </Box>
  );
};

export { BtnEndQuiz };
