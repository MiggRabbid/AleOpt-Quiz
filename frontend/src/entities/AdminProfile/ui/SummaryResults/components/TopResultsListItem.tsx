import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

import { iUserStats } from '@/types/stats.types';

interface ITopResultsListItemProps {
  result: iUserStats;
  index: number;
  isEasiest: boolean;
}

const TopResultsListItem = (props: ITopResultsListItemProps) => {
  const { index, isEasiest, result } = props;

  const lastResult = Math.floor(
    (result.attempts[0].correctAnswers / result.attempts[0].answers.length) * 100,
  );

  const wrapperClass = clsx(
    'flex h-fit! w-full! shrink-0 grow flex-col justify-center gap-2 rounded-xl p-2',
    isEasiest ? 'border-emerald-200 bg-emerald-100' : 'border-rose-200 bg-rose-100',
  );

  const indexWrapperClass = clsx(
    'flex w-full! flex-row items-center gap-2 border-b-2 pb-2',
    isEasiest ? 'border-emerald-200' : 'border-rose-200',
  );

  const indexTextClass = clsx(
    'flex size-5 shrink-0 items-center justify-center rounded-full text-sm!',
    isEasiest ? 'bg-emerald-200' : 'bg-rose-200',
  );

  const attemptClass = clsx(
    'w-fit! text-base! font-semibold!',
    isEasiest ? 'text-emerald-700' : 'text-rose-700',
  );

  return (
    <Box key={`${result.username}-${index}`} className={wrapperClass}>
      <Box className={indexWrapperClass}>
        <Typography align="left" className={indexTextClass}>
          {index + 1}
        </Typography>

        <Typography align="left" className="text-base! leading-none!">
          {result.username}
        </Typography>
      </Box>
      <Box className="flex h-fit! w-full! flex-col items-center justify-start gap-1">
        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography align="left" className={attemptClass}>
            Последняя попытка:
          </Typography>
          <Typography component="span" align="left" className={attemptClass}>
            {lastResult}%
          </Typography>
        </Box>
        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-600"
          >
            Всего попыток:
          </Typography>
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-600"
          >
            {result.numberAttempts}
          </Typography>
        </Box>

        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-600"
          >
            Средний результат:
          </Typography>
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-600"
          >
            {result.averageResult}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { TopResultsListItem };
