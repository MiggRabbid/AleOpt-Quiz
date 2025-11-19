import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { iQuestion } from '@/types/quiz.types';
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface ICorrectAnswerCounterProps {
  allQuestions: iQuestion[];
}

const CorrectAnswerCounter = (props: ICorrectAnswerCounterProps) => {
  const { allQuestions } = props;

  const currentResult = useAppSelector(getQuizStateField('currentResult'));
  const correctAnswers = currentResult.filter(
    (question) => question.userAnswerId === question.correctAnswerId,
  ).length;
  const questionCounter = allQuestions.length;
  const percent = (correctAnswers / questionCounter) * 100;

  const getTextColor = () => {
    if (percent > 66) return 'text-emerald-800!';
    if (percent < 50) return 'text-rose-800!';
    return 'text-orange-800!';
  };
  const getCircularColor = (): 'success' | 'error' | 'warning' => {
    if (percent > 66) return 'success';
    if (percent < 50) return 'error';
    return 'warning';
  };

  return (
    <Box className="relative flex h-fit w-full flex-col items-center justify-center gap-2 p-0">
      <Box className="flex h-fit shrink-0 flex-row items-center justify-center gap-1">
        <Typography
          component="p"
          align="center"
          className={`text-lg! leading-none font-bold! text-slate-600 ${getTextColor()}`}
        >
          {`верных ответов ${correctAnswers} из ${questionCounter}`}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        color={getCircularColor()}
        value={percent}
        className="h-3! w-full shrink-1 rounded-full"
      />
    </Box>
  );
};

const MemoCorrectAnswerCounter = React.memo(CorrectAnswerCounter);
export { MemoCorrectAnswerCounter as CorrectAnswerCounter };
