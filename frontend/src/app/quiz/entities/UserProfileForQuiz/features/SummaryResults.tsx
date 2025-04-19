'use client';

import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { AnswerCounter } from '../Components/AnswerCounter';
import { TimeCounter } from '../Components/TimeCounter';
import { CorrectAnswerCounter } from '../Components/CorrectAnswerCounter';
import { TimeCounterEnded } from '../Components/TimeCounterEnded';
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
        className="flex w-full grow flex-col items-center justify-center gap-10 rounded-xl px-10 py-10"
        id="SummaryResults"
      >
        <CircularProgress color="success" size={40} />
      </Box>
    );
  }

  return (
    <Box
      className="flex flex-col gap-10 rounded-xl border-2 border-slate-100 bg-slate-50 px-10 py-10"
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
