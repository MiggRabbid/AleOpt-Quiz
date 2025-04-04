import React from 'react';
import { Button, Typography } from '@mui/material';
import { typeQuestionAnswer } from '@/types/types';

interface IQuestionListItemOpenedAnswerProps {
  answer: typeQuestionAnswer;
  isSelectAnswer: boolean;
  onSelectAnswer: (userAnswerId: string) => void;
}

const QuestionListItemOpenedAnswer = (props: IQuestionListItemOpenedAnswerProps) => {
  const { answer, isSelectAnswer, onSelectAnswer } = props;
  return (
    <Button
      onClick={() => onSelectAnswer(answer.id)}
      className={`rounded-xl! border-2! border-green-200! px-4! py-4! ${isSelectAnswer ? 'bg-green-300! hover:bg-green-400!' : 'bg-green-100! hover:bg-green-200!'}`}
    >
      <Typography
        align="left"
        className="w-full! text-base! font-medium! text-wrap text-slate-800!"
      >
        {answer.answer}
      </Typography>
    </Button>
  );
};

const memoQuestionListItemOpenedAnswer = React.memo(QuestionListItemOpenedAnswer);
export { memoQuestionListItemOpenedAnswer as QuestionListItemOpenedAnswer };
