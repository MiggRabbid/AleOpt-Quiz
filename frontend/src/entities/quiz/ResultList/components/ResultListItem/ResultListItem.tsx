// Библиотеки
import React, { useMemo } from 'react';
import { Accordion, AccordionSummary, Box, Chip, Typography } from '@mui/material';
import clsx from 'clsx';
// Компоненты
import { ResultListItemAnswer } from './ResultListItemAnswer';
import { CustomListItem } from '@/shared/ui';
// Типизация
import type { iQuestion, iUserAnswer } from '@app/types';

interface IResultListItemProps {
  questions: iQuestion[];
  question: iUserAnswer;
  index: number;
}

const ResultListItem = (props: IResultListItemProps) => {
  const { questions, question, index } = props;

  const currQuestion = useMemo(
    () => questions.find((item) => item.id === question.questionId),
    [question.questionId],
  );

  const isCorrectAnswer = question.correctAnswerId === question.userAnswerId;

  const chipClass = clsx(
    'h-11! w-fit! min-w-11! rounded-full! text-base! font-bold! uppercase',
    isCorrectAnswer ? 'bg-emerald-200! text-emerald-600!' : 'bg-rose-200! text-rose-600!',
  );
  return (
    <CustomListItem
      classNames="flex flex-col gap-2 transition-shadow duration-500 hover:shadow-lg"
      paddingX="px-0!"
      paddingY="py-0!"
      shadowSize="shadow-none"
    >
      <Accordion
        className="shadow-small! w-full rounded-xl! border-0! border-slate-200! p-2! outline-0!"
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
              className="h-11! w-11! shrink-0 grow-0 rounded-full! bg-slate-200! text-base! font-bold! text-slate-800!"
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
              className={chipClass}
              variant="filled"
            />
          </Box>
        </AccordionSummary>
        <Box className="mb-4 flex w-full flex-col gap-2 px-4">
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
    </CustomListItem>
  );
};

const MemoResultListItem = React.memo(ResultListItem);
export { MemoResultListItem as ResultListItem };
