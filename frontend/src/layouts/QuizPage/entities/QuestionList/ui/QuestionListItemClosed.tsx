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
      className={`${isNext ? 'border-blue-300 bg-blue-200' : 'border-slate-300 bg-slate-200'} flex h-fit w-full gap-4 rounded-xl border-2 px-8! py-4!`}
    >
      <Chip
        label={index}
        className={`h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! ${isNext ? 'bg-blue-100! text-blue-400!' : 'bg-slate-100! text-slate-400!'}`}
        variant="filled"
      />
      <Typography
        className={`h-full! grow truncate! font-semibold! ${isNext ? 'text-blue-400!' : 'text-slate-400!'}`}
      >
        {question.question}
      </Typography>
      {!isNext && (
        <Chip
          label={userAnswers || '-'}
          className={`h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! uppercase ${isNext ? 'bg-blue-100! text-blue-400!' : 'bg-slate-100! text-slate-400!'}`}
          variant="filled"
        />
      )}
    </ListItem>
  );
};

const MemoQuestionListItemClosed = React.memo(QuestionListItemClosed);
export { MemoQuestionListItemClosed as QuestionListItemClosed };
