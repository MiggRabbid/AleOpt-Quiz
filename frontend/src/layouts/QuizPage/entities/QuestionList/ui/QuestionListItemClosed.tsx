'use client';
import React from 'react';
import { Chip, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { iQuestion } from '@/types/quiz.types';
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

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

  return (
    <ListItem
      className={`${isNext ? 'bg-blue-300' : 'bg-slate-300'} flex h-fit w-full gap-4 rounded-xl px-8! py-4! shadow-md!`}
    >
      <Chip
        label={index}
        className={`h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! ${isNext ? 'bg-blue-100! text-blue-600!' : 'bg-slate-100! text-slate-600!'}`}
        variant="filled"
      />
      <Typography
        className={`h-full! grow truncate! font-semibold! ${isNext ? 'text-blue-600!' : 'text-slate-600!'}`}
      >
        {question.question}
      </Typography>
      {!isNext && (
        <Chip
          label={userAnswers || '-'}
          className={`h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! uppercase ${isNext ? 'bg-blue-100! text-blue-600!' : 'bg-slate-100! text-slate-600!'}`}
          variant="filled"
        />
      )}
    </ListItem>
  );
};

const MemoQuestionListItemClosed = React.memo(QuestionListItemClosed);
export { MemoQuestionListItemClosed as QuestionListItemClosed };
