import { iQuestion } from '@/types/quiz.types';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface IAnswerCounterProps {
  questionsIndex: number;
  allQuestions: iQuestion[];
}

const AnswerCounter = (props: IAnswerCounterProps) => {
  const { questionsIndex, allQuestions } = props;

  const questionCounter = allQuestions.length;
  const percent = (questionsIndex / questionCounter) * 100;

  return (
    <Box className="align-center relative flex h-42 w-42 justify-center rounded-full border-14 border-emerald-200 bg-emerald-100 p-0">
      <CircularProgress
        variant="determinate"
        color="success"
        size={168}
        value={percent}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Box className="align-center absolute top-1/2 left-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <Typography
          component="p"
          align="center"
          className="border-b-4 px-1 py-2 text-2xl! leading-none font-bold! text-emerald-800"
        >
          {`${questionsIndex}`}
        </Typography>
        <Typography
          component="p"
          align="center"
          className="px-1 py-2 text-2xl! leading-none font-bold! text-emerald-800"
        >
          {`${questionCounter}`}
        </Typography>
      </Box>
    </Box>
  );
};

const MemoAnswerCounter = React.memo(AnswerCounter);
export { MemoAnswerCounter as AnswerCounter };
