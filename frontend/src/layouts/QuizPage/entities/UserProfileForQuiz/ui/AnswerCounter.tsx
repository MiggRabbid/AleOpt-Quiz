import { iQuestion } from '@/types/quiz.types';
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
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
    <Box className="relative flex h-fit w-full flex-row items-center justify-center gap-2 p-0">
      <LinearProgress
        variant="determinate"
        color="success"
        value={percent}
        className="h-3! w-full shrink-1 rounded-full"
      />
      <Box className="flex h-fit shrink-0 flex-row items-center justify-center gap-1">
        <Typography
          component="p"
          align="center"
          className="text-lg! leading-none font-bold! text-slate-600"
        >
          {`${questionsIndex}`} из {`${questionCounter}`}
        </Typography>
      </Box>
    </Box>
  );
};

const MemoAnswerCounter = React.memo(AnswerCounter);
export { MemoAnswerCounter as AnswerCounter };
