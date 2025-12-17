// Библиотеки
import { Box, CircularProgress, Typography } from '@mui/material';
import { memo, useEffect, useRef } from 'react';
// Логика
import { LocalKeyMap, useAppActions, useAppSelector, useLocalStorage } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
import { getBGAndBorderColor, getCircularColor } from './component.utils';

const TimeCounter = () => {
  const { setQuizStateField } = useAppActions();
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );
  const { seconds, minutes, currTime, maxTime } = useAppSelector(
    getQuizStateField('quizTimer'),
  );

  useEffect(() => {
    console.group('CHANGE / maxTime');
    console.log('maxTime -', maxTime);
    console.groupEnd();
  }, [maxTime]);
  useEffect(() => {
    console.group('CHANGE / currTime');
    console.log('currTime -', currTime);
    console.groupEnd();
  }, [currTime]);
  useEffect(() => {
    console.group('TimeCounter');
    console.log(`${minutes} : ${seconds}`);
    console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currTime]);

  const { setLocalData } = useLocalStorage();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (currTime > 0) {
      setLocalData<LocalKeyMap.TIMER>({
        key: LocalKeyMap.TIMER,
        data: { seconds, minutes, currTime, maxTime },
      });
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

  return (
    <Box
      className={`align-center relative flex h-40 w-40 justify-center rounded-full border-14 p-0 ${getBGAndBorderColor({ currTime, maxTime })}`}
      data-component="TimeCounter"
    >
      <CircularProgress
        variant="determinate"
        color={getCircularColor({ currTime, maxTime })}
        size={160}
        value={currTime > 0 ? (currTime / maxTime) * 100 : 100}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        sx={{
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Box className="align-center absolute top-1/2 left-1/2 flex h-fit w-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center">
        <Typography
          component="p"
          align="center"
          className={`px-1 py-1 leading-none font-bold! uppercase ${currTime > 0 ? 'text-2xl!' : 'text-1xl!'}`}
        >
          {currTime > 0 ? `${minutes} : ${seconds}` : `ВРЕМЯ ВЫШЛО`}
        </Typography>
      </Box>
    </Box>
  );
};

const MemoTimeCounter = memo(TimeCounter);
export { MemoTimeCounter as TimeCounter };
