'use client';
// Библиотеки
import { useEffect, useTransition } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
// Логика
import { routes } from '@/shared/config/routes';
import { useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { BtnMain } from '@/shared/ui/ui/btns';
import { useSession } from 'next-auth/react';
import { iResultEntryRequest } from '@/types/staff.types';
import { getFormattedDate } from '@/shared/lib/getFormattedDate';
import { api } from '@/shared/api/api';

const BtnEndQuiz = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const { delResult, delTimer } = useLocalStorage();

  const currentResult = useAppSelector(getQuizStateField('currentResult'));
  const isStarted = useAppSelector(getQuizStateField('isStarted'));

  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  useEffect(() => {}, [currentResult]);

  const handelClickSaveBtn = async () => {
    const params = { username: session?.user.username || '' };
    const data: iResultEntryRequest = {
      data: getFormattedDate(),
      answers: currentResult,
    };

    await api.addUserStats({
      params,
      data,
    });

    // startTransition(() => {
    //   router.push(routes.main);
    // });
    // delResult();
    // delTimer();
  };

  const handelClickEndBtn = () => {
    startTransition(() => {
      router.push(routes.main);
    });
    delResult();
    delTimer();
  };

  useEffect(() => {
    console.log('BtnEndQuiz / isPending-', isPending);
  }, [isPending]);

  return (
    <Box className="flex flex-col justify-end">
      {allQuestionsCompleted && (
        <BtnMain
          btnText="Сохранить результат?"
          btnClick={handelClickSaveBtn}
          isLoading={isPending}
          fullWidth
        />
      )}

      {isStarted && !allQuestionsCompleted && (
        <BtnMain
          btnText="Закончить попытку?"
          btnClick={handelClickEndBtn}
          isLoading={isPending}
          fullWidth
          color="warning"
        />
      )}
    </Box>
  );
};

export { BtnEndQuiz };
