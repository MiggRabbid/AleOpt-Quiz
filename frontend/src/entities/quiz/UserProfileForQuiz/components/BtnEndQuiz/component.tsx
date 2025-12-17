// Библиотеки
import { useEffect, useState, useTransition } from 'react';
import { Box } from '@mui/material';
// Логика
import {
  LocalKeyMap,
  useAppActions,
  useAppSelector,
  useAuthContext,
  useLocalStorage,
  useNavigate,
} from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { getFormattedDate } from '@/shared/lib';
import { routes } from '@/app/router';
// Компоненты
import { BtnMain } from '@/shared/ui/btns';
// Типизация
import type { iResultEntryRequest } from '@app/types';
import { useUpdateUserStats } from '@/app/api/hooks';

const BtnEndQuiz = () => {
  const { user } = useAuthContext();
  const { navigateTo } = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { delLocalData } = useLocalStorage();
  const { clearAllState } = useAppActions();

  const currentResult = useAppSelector(getQuizStateField('currentResult'));
  const isStarted = useAppSelector(getQuizStateField('isStarted'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  const { mutateAsync, isPending: isFetching } = useUpdateUserStats({
    onSuccess: () => handleSuccess(),
  });

  const clearQuizState = () => {
    clearAllState();
    delLocalData<LocalKeyMap.TIMER>({ key: LocalKeyMap.TIMER });
    delLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT });
  };

  const handleSuccess = () => {
    startTransition(() => {
      navigateTo({ to: routes.main });
    });

    clearQuizState();
  };

  const handelClickSaveBtn = async () => {
    const data: iResultEntryRequest = {
      data: getFormattedDate(),
      answers: currentResult,
    };

    mutateAsync({
      params: {
        username: user?.username ?? '',
      },
      query: data,
    });
  };

  const handelClickEndBtn = () => {
    startTransition(() => {
      navigateTo({ to: routes.main });
    });
    clearQuizState();
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
