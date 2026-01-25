// Библиотеки
import { Box } from '@mui/material';
// Компоненты
import { LastResultTable, ResultTable } from '@/entities/users/UserProfile/components';
import { CustomCardWrapper } from '@/shared/ui';
// Типизация
import type { iUserStats } from '@app/types';

interface ISummaryResultProps {
  userStats: iUserStats | null;
}

const SummaryResults = (props: ISummaryResultProps) => {
  const { userStats } = props;

  return (
    <CustomCardWrapper>
      <Box
        className="flex flex-col gap-2 rounded-3xl bg-slate-50 px-4 pt-4 pb-8"
        id="SummaryResults"
      >
        <ResultTable userStats={userStats} />
        {!!userStats && <LastResultTable attempts={userStats.attempts} />}
      </Box>
    </CustomCardWrapper>
  );
};

export { SummaryResults };
