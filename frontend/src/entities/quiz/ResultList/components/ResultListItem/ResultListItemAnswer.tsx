// Библиотеки
import { memo } from 'react';
import { AccordionDetails, Typography } from '@mui/material';
import clsx from 'clsx';
// Логика
import { getAnswerBorder, getAnswerIdBg } from '../../utils';
// Типизация
import type { iUserAnswer, typeQuestionAnswer } from '@app/types';

interface IResultListItemAnswerProps {
  question: iUserAnswer;
  answer: typeQuestionAnswer;
}

const ResultListItemAnswer = (props: IResultListItemAnswerProps) => {
  const { question, answer } = props;

  const detailsClass = clsx(
    'gap-4 border-0! justify-start items-center flex gap-4 rounded-xl! px-4! py-4!',
    getAnswerBorder(question.correctAnswerId, question.userAnswerId, answer.id),
  );

  const detailsIdClass = clsx(
    'flex h-6! w-6! items-center justify-center rounded-full! text-xs! leading-none! font-bold! uppercase',
    getAnswerIdBg(question.correctAnswerId, question.userAnswerId, answer.id),
  );

  return (
    <AccordionDetails className={detailsClass}>
      <Typography className={detailsIdClass}>{answer.id}</Typography>
      <Typography
        align="left"
        className="w-full! text-base! font-medium! text-wrap text-slate-800!"
      >
        {answer.answer}
      </Typography>
    </AccordionDetails>
  );
};

const MemoResultListItemAnswer = memo(ResultListItemAnswer);
export { MemoResultListItemAnswer as ResultListItemAnswer };
