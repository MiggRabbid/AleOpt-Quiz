'use client';

import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { AnswerCounter } from '../ui/AnswerCounter';
import { TimeCounter } from '../ui/TimeCounter';
import { CorrectAnswerCounter } from '../ui/CorrectAnswerCounter';
import { TimeCounterEnded } from '../ui/TimeCounterEnded';
import { useSession } from 'next-auth/react';

const SummaryResults = () => {
  const { status } = useSession();
  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const allQuestions = useAppSelector(getQuizStateField('questions'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

  if (status === 'loading' || allQuestions.length === 0) {
    return (
      <Box
        className="flex w-full grow flex-col items-center justify-center gap-10 rounded-2xl px-10 py-10"
        id="SummaryResults"
      >
        <CircularProgress color="success" size={40} />
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-slate-50 px-10 py-10 shadow-xl"
      id="SummaryResults"
    >
      {allQuestionsCompleted ? (
        <CorrectAnswerCounter allQuestions={allQuestions} />
      ) : (
        <AnswerCounter questionsIndex={questionsIndex} allQuestions={allQuestions} />
      )}
      {allQuestionsCompleted ? <TimeCounterEnded /> : <TimeCounter />}
    </Box>
  );
};

export { SummaryResults };
