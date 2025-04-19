import React from 'react';
import { Button, Typography } from '@mui/material';
import { typeQuestionAnswer } from '@/types/types';

interface IQuestionListItemOpenedAnswerProps {
  answer: typeQuestionAnswer;
  isSelectAnswer: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectAnswer: (userAnswerId: string) => void;
}

const QuestionListItemOpenedAnswer = (props: IQuestionListItemOpenedAnswerProps) => {
  const { answer, isSelectAnswer, onSelectAnswer } = props;
  return (
    <Button
      onClick={() => onSelectAnswer(answer.id)}
      className={`gap-4 rounded-xl! border-2! border-green-200! px-4! py-4! ${isSelectAnswer ? 'bg-green-600! hover:bg-green-500!' : 'bg-green-100! hover:bg-green-200!'}`}
    >
      <Typography
        className={`flex h-6! w-6! items-center justify-center rounded-full! text-xs! leading-none! font-bold! ${isSelectAnswer ? 'bg-green-500! text-white!' : 'bg-green-300! text-slate-800!'}`}
      >
        {answer.id}
      </Typography>
      <Typography
        align="left"
        className={`w-full! ${isSelectAnswer ? 'font-semibold! text-white!' : 'font-medium! text-slate-800!'} text-base! font-medium! text-wrap`}
      >
        {answer.answer}
      </Typography>
    </Button>
  );
};

const memoQuestionListItemOpenedAnswer = React.memo(QuestionListItemOpenedAnswer);
export { memoQuestionListItemOpenedAnswer as QuestionListItemOpenedAnswer };
