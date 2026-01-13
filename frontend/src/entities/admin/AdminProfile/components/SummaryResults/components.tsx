// Библиотеки
import { Box } from '@mui/material';
// Логика
import { sortUsersByResult } from '@/utils';
// Компоненты
import { TopResultsList } from '../';
import { CustomCardWrapper } from '@/shared/ui';
// Типизация
import type { iUserStats } from '@app/types';

interface ISummaryResultProps {
  usersStats: iUserStats[] | undefined;
}

const SummaryResults = ({ usersStats }: ISummaryResultProps) => {
  if (!usersStats || usersStats.length === 0) return null;

  const sortedResults = sortUsersByResult(usersStats);

  return (
    <CustomCardWrapper>
      <Box
        className="flex w-full flex-col gap-2 rounded-2xl bg-slate-50 p-4"
        id="SummaryResults"
      >
        <Box className="flex flex-col justify-start gap-2">
          <TopResultsList sortedResults={sortedResults} />
        </Box>
      </Box>
    </CustomCardWrapper>
  );
};

export { SummaryResults };
