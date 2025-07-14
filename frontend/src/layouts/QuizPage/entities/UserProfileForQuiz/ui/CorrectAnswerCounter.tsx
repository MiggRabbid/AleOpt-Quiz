import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { iQuestion } from '@/types/quiz.types';
import { Box, CircularProgress, Typography } from '@mui/material';
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

  const getBGAndBorderColor = () => {
    if (percent > 66) return 'text-emerald-800! bg-emerald-100  border-emerald-200';

    if (percent < 50) return 'text-rose-800! bg-rose-100 border-rose-200';
    return 'text-orange-800! bg-orange-100  border-orange-200';
  };
  const getCircularColor = (): 'success' | 'error' | 'warning' => {
    if (percent > 66) return 'success';
    if (percent < 50) return 'error';
    return 'warning';
  };

  return (
    <Box
      className={`relative flex h-42 w-42 items-center justify-center rounded-full border-14 ${getBGAndBorderColor()}`}
    >
      <CircularProgress
        variant="determinate"
        color={getCircularColor()}
        size={168}
        value={percent}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Box className="absolute top-1/2 left-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <Typography
          component="p"
          align="center"
          className="w-fit! border-b-4 px-1 py-2 text-2xl! leading-none font-bold!"
        >
          <Typography
            component="span"
            className="me-1! text-sm! leading-none font-bold! uppercase"
          >
            Верных:
          </Typography>
          {`${correctAnswers}`}
        </Typography>
        <Typography
          component="p"
          className="w-fit! px-1 py-2 text-2xl! leading-none font-bold!"
        >
          <Typography
            component="span"
            align="center"
            className="me-1! text-sm! leading-none font-bold! uppercase"
          >
            Всего:
          </Typography>
          {`${questionCounter}`}
        </Typography>
      </Box>
    </Box>
  );
};

const MemoCorrectAnswerCounter = React.memo(CorrectAnswerCounter);
export { MemoCorrectAnswerCounter as CorrectAnswerCounter };
