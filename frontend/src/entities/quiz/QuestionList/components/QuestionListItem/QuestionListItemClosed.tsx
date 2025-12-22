// Библиотеки
import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import clsx from 'clsx';
// Логика
import { useAppSelector } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
// Типизация
import type { iQuestion } from '@app/types';

interface IQuestionItemProps {
  question: iQuestion;
  type: 'prev' | 'next';
  index: number;
}

const QuestionListItemClosed = (props: IQuestionItemProps) => {
  const { question, type, index } = props;

  const userAnswers = useAppSelector(getQuizStateField('currentResult'))?.find(
    (item) => item.questionId === question.id,
  )?.userAnswerId;

  const isNext = type === 'next';

  const listItemClasses = clsx(
    'flex justify-between items-center h-fit w-full gap-4 px-8! py-4!',
    {
      'bg-blue-300': isNext,
      'bg-slate-300': !isNext,
    },
  );

  const chipClasses = clsx('h-11! w-fit! min-w-11! rounded-full! text-base! font-bold!', {
    'bg-blue-100! text-blue-600!': isNext,
    'bg-slate-100! text-slate-600!': !isNext,
  });

  const typographyClasses = clsx('h-full! w-full font-semibold!', {
    'text-blue-600!': isNext,
    'text-slate-600!': !isNext,
  });

  const selectedAnswerClasses = clsx(
    'h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! uppercase',
    {
      'bg-blue-100! text-blue-600!': isNext,
      'bg-slate-100! text-slate-600!': !isNext,
    },
  );

  return (
    <Box className={listItemClasses}>
      <Chip label={index} className={chipClasses} variant="filled" />
      <Typography
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        className={typographyClasses}
      >
        {question.question}
      </Typography>
      {!isNext && (
        <Chip
          label={userAnswers || '-'}
          className={selectedAnswerClasses}
          variant="filled"
        />
      )}
    </Box>
  );
};

const MemoQuestionListItemClosed = React.memo(QuestionListItemClosed);
export { MemoQuestionListItemClosed as QuestionListItemClosed };
