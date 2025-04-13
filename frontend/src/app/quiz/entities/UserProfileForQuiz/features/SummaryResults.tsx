'use client';

import { Box } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { AnswerCounter } from '../Components/AnswerCounter';
import { TimeCounter } from '../Components/TimeCounter';
import { CorrectAnswerCounter } from '../Components/CorrectAnswerCounter';
import { TimeCounterEnded } from '../Components/TimeCounterEnded';

const SummaryResults = () => {
  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const allQuestions = useAppSelector(getQuizStateField('questions'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

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
