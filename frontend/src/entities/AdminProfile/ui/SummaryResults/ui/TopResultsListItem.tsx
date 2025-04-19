import { iUserStats } from '@/types/stats';
import { Box, Typography } from '@mui/material';

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

  return (
    <Box
      key={`${result.username}-${index}`}
      className={`flex h-fit! w-full! shrink-0 grow flex-col justify-center gap-2 rounded-xl border-2 p-2 ${isEasiest ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}
    >
      <Box
        className={`flex w-full! flex-row items-center gap-2 border-b-2 pb-2 ${isEasiest ? 'border-emerald-100' : 'border-rose-100'}`}
      >
        <Typography
          align="left"
          className={`flex size-5 shrink-0 items-center justify-center rounded-full text-sm! ${isEasiest ? 'bg-emerald-100' : 'bg-rose-100'}`}
        >
          {index + 1}
        </Typography>

        <Typography align="left" className="text-base! leading-none!">
          {result.username}
        </Typography>
      </Box>
      <Box className="flex h-fit! w-full! flex-col items-center justify-start gap-1">
        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography
            align="left"
            className={`w-fit! text-base! font-semibold! ${isEasiest ? 'text-emerald-700' : 'text-rose-700'}`}
          >
            Последняя попытка:
          </Typography>
          <Typography
            component="span"
            align="left"
            className={`w-fit! text-base! font-semibold! ${isEasiest ? 'text-emerald-700' : 'text-rose-700'}`}
          >
            {lastResult}%
          </Typography>
        </Box>
        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-500"
          >
            Всего попыток:
          </Typography>
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-500"
          >
            {result.numberAttempts}
          </Typography>
        </Box>

        <Box className="flex w-full! flex-row items-center justify-between gap-4">
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-500"
          >
            Средний результат:
          </Typography>
          <Typography
            align="right"
            className="w-fit! text-sm! font-semibold! text-slate-500"
          >
            {result.averageResult}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { TopResultsListItem };
