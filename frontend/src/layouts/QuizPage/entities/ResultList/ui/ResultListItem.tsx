import React from 'react';

import { Accordion, AccordionSummary, Box, Chip, Typography } from '@mui/material';

import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

import { ResultListItemAnswer } from './ResultListItemAnswer';
import { iUserAnswer } from '@/types/staff.types';

interface IResultListItemProps {
  question: iUserAnswer;
  index: number;
}

const ResultListItem = (props: IResultListItemProps) => {
  const { question, index } = props;

  const questions = useAppSelector(getQuizStateField('questions'));

  const currQuestion = questions.find((item) => item.id === question.questionId);
  const isCorrectAnswer = question.correctAnswerId === question.userAnswerId;

  return (
    <Accordion
      className="shadow-small! rounded-xl! border-0! border-slate-100! p-2! outline-0!"
      sx={{
        '&::before': { display: 'none' },
      }}
    >
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        className="my-2 flex w-full! flex-col items-end! gap-4"
        slotProps={{
          content: {
            component: 'div',
            className: 'w-full! min-h-fit! flex gap-4 items-stretch!',
          },
        }}
      >
        <Box className="mb-auto! flex shrink-0 grow-0 items-start">
          <Chip
            label={index + 1}
            className="h-11! w-11! shrink-0 grow-0 rounded-full! bg-slate-100! text-base! font-bold! text-slate-800!"
            variant="filled"
          />
        </Box>

        <Box className="flex h-fit min-h-11! grow items-center">
          <Typography className="h-fit! w-full grow truncate! font-semibold! text-wrap! text-slate-800!">
            {question.question}
          </Typography>
        </Box>

        <Box className="mb-auto! flex shrink-0 grow-0 items-start">
          <Chip
            label={question.userAnswerId || '-'}
            className={`h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! uppercase ${isCorrectAnswer ? 'bg-emerald-100! text-emerald-400!' : 'bg-rose-100! text-rose-400!'}`}
            variant="filled"
          />
        </Box>
      </AccordionSummary>
      <Box className="flex w-full flex-col gap-2 px-4">
        {currQuestion &&
          currQuestion.answers.map((answer) => (
            <ResultListItemAnswer
              key={`question-${question.questionId}-${answer.id}`}
              question={question}
              answer={answer}
            />
          ))}
      </Box>
    </Accordion>
  );
};

const MemoResultListItem = React.memo(ResultListItem);
export { MemoResultListItem as ResultListItem };
