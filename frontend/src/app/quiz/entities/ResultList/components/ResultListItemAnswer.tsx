import { iUserAnswer } from '@/types/staff';
import { typeQuestionAnswer } from '@/types/types';
import { AccordionDetails, Typography } from '@mui/material';
import React from 'react';

interface IResultListItemAnswerProps {
  question: iUserAnswer;
  answer: typeQuestionAnswer;
}

const ResultListItemAnswer = (props: IResultListItemAnswerProps) => {
  const { question, answer } = props;

  const isCorrectAnswer = question.correctAnswerId === answer.id;
  const isSelectAnswer = question.userAnswerId === answer.id;

  const getAnswerBorder = () => {
    if (isCorrectAnswer && isSelectAnswer) {
      return 'border-emerald-200! bg-emerald-50!';
    }
    if (!isCorrectAnswer && isSelectAnswer) {
      return 'border-rose-200! bg-rose-50!';
    }
    if (isCorrectAnswer) {
      return 'border-blue-200! bg-blue-50!';
    }
    return 'border-slate-200! bg-slate-50!';
  };

  const getAnswerIdBg = () => {
    if (isCorrectAnswer && isSelectAnswer) {
      return 'bg-emerald-300! text-emerald-800! ';
    }
    if (!isCorrectAnswer && isSelectAnswer) {
      return 'bg-rose-300! text-rose-800! ';
    }
    if (isCorrectAnswer) {
      return 'bg-blue-300! text-blue-800! ';
    }
    return 'bg-slate-300! text-slate-800! ';
  };

  return (
    <AccordionDetails
      className={`gap-4border-0! flex gap-4 rounded-xl! border-2! px-4! py-4! ${getAnswerBorder()}`}
    >
      <Typography
        className={`flex h-6! w-6! items-center justify-center rounded-full! text-xs! leading-none! font-bold! uppercase ${getAnswerIdBg()}`}
      >
        {answer.id}
      </Typography>
      <Typography
        align="left"
        className={`w-full! text-base! font-medium! text-wrap text-slate-800!`}
      >
        {answer.answer}
      </Typography>
    </AccordionDetails>
  );
};

const MemoResultListItemAnswer = React.memo(ResultListItemAnswer);
export { MemoResultListItemAnswer as ResultListItemAnswer };
