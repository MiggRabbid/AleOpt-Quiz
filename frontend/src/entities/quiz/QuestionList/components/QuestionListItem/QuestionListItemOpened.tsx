// Библиотеки
import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
// Логика
import { LocalKeyMap, useAppActions, useAppSelector, useLocalStorage } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
// Компоненты
import { QuestionListItemOpenedAnswer } from './QuestionListItemOpenedAnswer';
import { QuestionListItemOpenedBtn } from './QuestionListItemOpenedBtn';
// Типизация
import type { iQuestion, iUserAnswer, typeQuestionAnswer } from '@app/types';

interface IQuestionItemProps {
  questions: iQuestion[];
  question: iQuestion;
  index: number;
}

const QuestionListItemOpened = (props: IQuestionItemProps) => {
  const { questions, question, index } = props;

  const { addAnswer, nextQuestion, setQuizStateField } = useAppActions();
  const { delLocalData } = useLocalStorage();

  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const questionsLength = questions.length;

  const [currentAnswer, setCurrentAnswer] = useState<iUserAnswer | null>(null);

  const handlerClickOnAnswer = (userAnswerId: string) => {
    if (currentAnswer?.userAnswerId === userAnswerId) {
      return setCurrentAnswer(null);
    }
    const { correctAnswerId, question: questionText, id } = question;
    const result: iUserAnswer = {
      questionId: id,
      question: questionText,
      userAnswerId,
      correctAnswerId,
      result: userAnswerId === correctAnswerId ? 1 : 0,
    };

    setCurrentAnswer(result);
  };

  const onConfirmAnswer = () => {
    if (currentAnswer) {
      addAnswer(currentAnswer);
      setCurrentAnswer(null);
      nextQuestion();

      const isLastQuestion = questionsIndex === questionsLength - 1;

      if (isLastQuestion) {
        setQuizStateField({
          field: 'allQuestionsCompleted',
          data: isLastQuestion,
        });
        delLocalData<LocalKeyMap.RESULT>({ key: LocalKeyMap.RESULT });
      }
    }
  };

  return (
    <Box className="flex w-full flex-col items-end! gap-4 bg-emerald-50! p-8!">
      <Box className="flex w-full items-center gap-4 border-b-4 border-emerald-300 pb-3">
        <Box className="mb-auto! flex shrink-0 grow-0 items-start">
          <Chip
            label={index}
            className="h-11! w-11! shrink-0 grow-0 rounded-full! bg-emerald-100! text-base! font-bold! text-slate-800! shadow-md"
            variant="filled"
          />
        </Box>

        <Box className="flex h-full min-h-fit justify-center">
          <Typography align="left" className="w-full text-xl! font-medium!">
            {question.question}
          </Typography>
        </Box>
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
    </Box>
  );
};

const MemoQuestionListItemOpened = React.memo(QuestionListItemOpened);
export { MemoQuestionListItemOpened as QuestionListItemOpened };
