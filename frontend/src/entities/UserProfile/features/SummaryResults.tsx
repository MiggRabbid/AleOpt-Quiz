import { Box } from '@mui/material';

import { ResultTable } from '../components/ResultTable';
import { LastResultTable } from '../components/LastResultTable';

import { iUserStats } from '@/types/stats';

interface ISummaryResultProps {
  userStats: iUserStats | null;
}

const SummaryResults = (props: ISummaryResultProps) => {
  const { userStats } = props;

  return (
    <Box
      className="flex flex-col gap-2 rounded-xl border-2 border-slate-200 px-4 pt-4 pb-8"
      id="SummaryResults"
    >
      <ResultTable userStats={userStats} />
      <LastResultTable attempts={userStats?.attempts || null} />
    </Box>
  );
};

export { SummaryResults };
