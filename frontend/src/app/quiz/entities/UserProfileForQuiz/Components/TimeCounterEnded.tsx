'use client';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

const TimeCounterEnded = () => {
  const { currTime, maxTime } = useAppSelector(getQuizStateField('quizTimer'));
  const attemptTime = maxTime - currTime;
  const attemptMinutes = String(Math.floor(attemptTime / 60)).padStart(2, '0');
  const attemptSeconds = String(attemptTime % 60).padStart(2, '0');

  return (
    <Box className="align-center relative flex h-42 w-42 justify-center rounded-full border-14 border-sky-200 bg-sky-100 p-0 text-sky-800!">
      <CircularProgress
        variant="determinate"
        color="info"
        size={168}
        value={currTime > 0 ? (currTime / maxTime) * 100 : 100}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Box className="align-center absolute top-1/2 left-1/2 flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <Typography
          component="p"
          align="center"
          className={`px-1 py-2 text-2xl! leading-none font-bold! ${currTime > 0 ? 'border-b-4' : 'border-b-0'}`}
        >
          {attemptMinutes}
          <Typography
            component="span"
            className="ms-1! text-sm! leading-none font-bold! uppercase"
          >
            мин
          </Typography>
        </Typography>
        <Typography
          component="p"
          align="center"
          className="px-1 py-2 text-2xl! leading-none font-bold!"
        >
          {attemptSeconds}
          <Typography
            component="span"
            className="ms-1! text-sm! leading-none font-bold! uppercase"
          >
            сек
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

const MemoTimeCounterEnded = React.memo(TimeCounterEnded);
export { MemoTimeCounterEnded as TimeCounterEnded };
