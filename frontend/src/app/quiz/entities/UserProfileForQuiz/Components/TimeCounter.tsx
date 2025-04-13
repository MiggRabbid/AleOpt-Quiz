'use client';
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const TimeCounter = () => {
  const { setQuizStateField } = useAppActions();
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );
  const { seconds, minutes, currTime, maxTime } = useAppSelector(
    getQuizStateField('quizTimer'),
  );

  const { setTimer } = useLocalStorage();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currTime > 0) {
      setTimer({ seconds, minutes, currTime, maxTime });
    }
    if (currTime <= 0 || allQuestionsCompleted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const newTime = currTime - 1;
      if (newTime < 0) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        return;
      }
      const newMinutes = String(Math.floor(newTime / 60)).padStart(2, '0');
      const newSeconds = String(newTime % 60).padStart(2, '0');

      setQuizStateField({
        field: 'quizTimer',
        data: {
          seconds: newSeconds,
          minutes: newMinutes,
          currTime: newTime,
          maxTime,
        },
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTime]);

  const getBGAndBorderColor = () => {
    const percent = (currTime / maxTime) * 100;
    if (percent < 20) return 'text-rose-800! bg-rose-100 border-rose-200';
    if (percent < 50) return 'text-orange-800! bg-orange-100  border-orange-200';
    return 'text-emerald-800! bg-emerald-100  border-emerald-200';
  };
  const getCircularColor = (): 'success' | 'error' | 'warning' => {
    const percent = (currTime / maxTime) * 100;
    if (percent < 20) return 'error';
    if (percent < 50) return 'warning';
    return 'success';
  };

  return (
    <Box
      className={`align-center relative flex h-42 w-42 justify-center rounded-full border-14 p-0 ${getBGAndBorderColor()}`}
    >
      <CircularProgress
        variant="determinate"
        color={getCircularColor()}
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
          {currTime > 0 ? minutes : 'ВРЕМЯ'}
          {currTime > 0 && (
            <Typography
              component="span"
              className="ms-1! text-sm! leading-none font-bold! uppercase"
            >
              мин
            </Typography>
          )}
        </Typography>
        <Typography
          component="p"
          align="center"
          className="px-1 py-2 text-2xl! leading-none font-bold!"
        >
          {currTime > 0 ? seconds : 'ВЫШЛО'}
          {currTime > 0 && (
            <Typography
              component="span"
              className="ms-1! text-sm! leading-none font-bold! uppercase"
            >
              сек
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const MemoTimeCounter = React.memo(TimeCounter);
export { MemoTimeCounter as TimeCounter };
