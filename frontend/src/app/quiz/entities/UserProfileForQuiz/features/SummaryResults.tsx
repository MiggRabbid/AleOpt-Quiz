import { Box } from '@mui/material';

interface ISummaryResultProps {}

const SummaryResults = () => {
  return (
    <Box
      className="flex flex-col gap-2 rounded-xl border-2 border-slate-100 bg-slate-50 px-4 pt-4 pb-8"
      id="SummaryResults"
    ></Box>
  );
};

export { SummaryResults };
