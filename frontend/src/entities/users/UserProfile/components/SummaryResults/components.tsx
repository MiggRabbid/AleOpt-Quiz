// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { ResultTable, LastResultTable } from '../';
// Типизация
import type { iUserStats } from '@app/types';

interface ISummaryResultProps {
  userStats: iUserStats | null;
}

const SummaryResults = (props: ISummaryResultProps) => {
  const { userStats } = props;

  return (
    <Box
      className="flex flex-col gap-2 rounded-3xl bg-slate-50 px-4 pt-4 pb-8 shadow-none transition-shadow duration-500 hover:shadow-xl"
      id="SummaryResults"
    >
      <ResultTable userStats={userStats} />
      {!!userStats && <LastResultTable attempts={userStats.attempts} />}
    </Box>
  );
};

export { SummaryResults };
