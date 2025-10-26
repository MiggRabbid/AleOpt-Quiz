'use client';
// Библиотеки
import { Box } from '@mui/material';
import { useLayoutEffect } from 'react';
// Логика
import { useAppActions } from '@/hooks';
// Компоненты
import { ResultTable } from '../ui';
import { LastResultTable } from '../ui';
// Типизация
import { iUserStats } from '@/types/stats.types';

interface ISummaryResultProps {
  userStats: iUserStats | null;
}

const SummaryResults = (props: ISummaryResultProps) => {
  const { userStats } = props;

  const { clearCurrentResult, setQuizStateField } = useAppActions();
  useLayoutEffect(() => {
    clearCurrentResult();
    setQuizStateField({
      field: 'isStarted',
      data: false,
    });
    setQuizStateField({
      field: 'quizTimer',
      data: {
        seconds: '00',
        minutes: '00',
        currTime: 0,
        maxTime: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      className="flex flex-col gap-2 rounded-3xl bg-slate-50 px-4 pt-4 pb-8 shadow-xl"
      id="SummaryResults"
    >
      <ResultTable userStats={userStats} />
      {!!userStats && <LastResultTable attempts={userStats.attempts} />}
    </Box>
  );
};

export { SummaryResults };
