// Библиотеки
import React from 'react';
import { Button, Typography } from '@mui/material';
import clsx from 'clsx';
// Типизация
import type { typeQuestionAnswer } from '@app/types';

interface IQuestionListItemOpenedAnswerProps {
  answer: typeQuestionAnswer;
  isSelectAnswer: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectAnswer: (userAnswerId: string) => void;
}

const QuestionListItemOpenedAnswer = (props: IQuestionListItemOpenedAnswerProps) => {
  const { answer, isSelectAnswer, onSelectAnswer } = props;

  const btnClasses = clsx('gap-4 rounded-xl! px-4! py-4! shadow-m', {
    'bg-emerald-600! hover:bg-emerald-500!': isSelectAnswer,
    'bg-emerald-100! hover:bg-emerald-200!': !isSelectAnswer,
  });

  const typographyIdClasses = clsx(
    'flex h-6! w-6! items-center justify-center rounded-full! text-xs! leading-none! font-bold',
    {
      'bg-emerald-500! text-white!': isSelectAnswer,
      'bg-emerald-300! text-slate-800!': !isSelectAnswer,
    },
  );

  const typographyTextClasses = clsx('w-full! text-base! font-medium! text-wrap', {
    'font-semibold! text-white!': isSelectAnswer,
    'font-medium! text-slate-800!': !isSelectAnswer,
  });
  return (
    <Button onClick={() => onSelectAnswer(answer.id)} className={btnClasses}>
      <Typography className={typographyIdClasses}>{answer.id}</Typography>
      <Typography align="left" className={typographyTextClasses}>
        {answer.answer}
      </Typography>
    </Button>
  );
};

const memoQuestionListItemOpenedAnswer = React.memo(QuestionListItemOpenedAnswer);
export { memoQuestionListItemOpenedAnswer as QuestionListItemOpenedAnswer };
