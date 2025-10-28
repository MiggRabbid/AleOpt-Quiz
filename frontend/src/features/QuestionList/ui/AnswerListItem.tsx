import { Box, Typography } from '@mui/material';

import { typeQuestionAnswer } from '@/types/types.types';

interface IAnswerListItemProps {
  answer: typeQuestionAnswer;
  isCorrect: boolean;
}

const AnswerListItem = (props: IAnswerListItemProps) => {
  const { answer, isCorrect } = props;
  return (
    <Box
      className={`flex gap-4 rounded-xl! px-4! py-4! ${isCorrect ? 'bg-emerald-200!' : 'bg-slate-100!'}`}
    >
      <Typography
        className={`flex h-6! w-6! items-center justify-center rounded-full! text-xs! leading-none! font-bold! text-slate-800! uppercase! ${isCorrect ? 'bg-emerald-100!' : 'bg-slate-200!'}`}
      >
        {answer.id}
      </Typography>
      <Typography
        align="left"
        className="w-full! text-base! font-medium! text-wrap text-slate-800!"
      >
        {answer.answer}
      </Typography>
    </Box>
  );
};

export { AnswerListItem };
