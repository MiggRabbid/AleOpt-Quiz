'use client';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
import { sortUsersByResult } from '@/shared/lib/sortUsersByResult';
import { TopResultsList } from './ui/TopResultsList';

const SummaryResults = () => {
  const results = useAppSelector(getQuizStateField('results'));

  const sortedResults = sortUsersByResult(results);

  if (results.length === 0) return null;

  return (
    <Box
      className="flex w-full flex-col gap-2 rounded-xl border-2 border-slate-200 p-4"
      id="SummaryResults"
    >
      <Box className="flex grow flex-col justify-start gap-2">
        <Typography
          align="center"
          className="align-center! w-full! text-base! font-semibold! uppercase"
        >
          Самые и самые
        </Typography>
        <TopResultsList sortedResults={sortedResults} />
      </Box>
    </Box>
  );
};

export { SummaryResults };
