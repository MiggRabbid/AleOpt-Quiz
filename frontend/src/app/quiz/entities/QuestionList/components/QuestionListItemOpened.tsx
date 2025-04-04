'use client';
import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { iQuestion } from '@/types/quiz';
import { typeQuestionAnswer } from '@/types/types';
import { QuestionListItemOpenedAnswer } from './QuestionListItemOpenedAnswer';
import { QuestionListItemOpenedBtn } from './QuestionListItemOpenedBtn';
import { useAppActions } from '@/hooks';
import { iUserAnswer } from '@/types/staff';

interface IQuestionItemProps {
  question: iQuestion;
  index: number;
}

const QuestionListItemOpened = (props: IQuestionItemProps) => {
  const { question, index } = props;

  const { addAnswer, nextQuestion } = useAppActions();

  const [currentAnswer, setCurrentAnswer] = useState<iUserAnswer | null>(null);

  const handlerClickOnAnswer = (userAnswerId: string) => {
    if (currentAnswer?.userAnswerId === userAnswerId) {
      setCurrentAnswer(null);
    } else {
      const { correctAnswerId, question: questionText, id } = question;
      const result: iUserAnswer = {
        questionId: id,
        question: questionText,
        userAnswerId,
        correctAnswerId,
        result: userAnswerId === correctAnswerId ? 1 : 0,
      };
      setCurrentAnswer(result);
    }
  };

  const onConfirmAnswer = () => {
    if (currentAnswer) {
      addAnswer(currentAnswer);
      setCurrentAnswer(null);
      nextQuestion();
    }
  };

  return (
    <ListItem className="my-2 flex flex-col items-end! gap-4 rounded-xl border-2! border-green-200! bg-green-50! p-8!">
      <Box className="flex w-full gap-4 border-b-2 border-green-100 pb-3">
        <Chip
          label={index}
          className="h-11! w-11! rounded-full! bg-green-100! text-base! font-bold! text-slate-800!"
          variant="filled"
        />
        <Typography align="left" className="w-full text-xl! font-medium!">
          {question.question}
        </Typography>
      </Box>

      <Box className="flex w-full flex-col gap-2">
        {question.answers.map((answer: typeQuestionAnswer) => {
          return (
            <QuestionListItemOpenedAnswer
              key={`question-${question.id}-answer-${answer.id}`}
              answer={answer}
              onSelectAnswer={handlerClickOnAnswer}
              isSelectAnswer={answer.id === currentAnswer?.userAnswerId}
            />
          );
        })}
      </Box>

      <QuestionListItemOpenedBtn
        onConfirmAnswer={onConfirmAnswer}
        disabled={!currentAnswer}
      />
    </ListItem>
  );
};

const MemoQuestionListItemOpened = React.memo(QuestionListItemOpened);
export { MemoQuestionListItemOpened as QuestionListItemOpened };
