'use client';
// Библиотеки
import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';
// Логика
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { QuestionListItemOpened } from './components/QuestionListItemOpened';
import { QuestionListItemClosed } from './components/QuestionListItemClosed';
//Типизация
import { iQuestion } from '@/types/quiz';
import { ResultList } from '../ResultList/ResultList';

interface IQuestionListProps {
  questions: iQuestion[] | null;
}

const QuestionList = (props: IQuestionListProps) => {
  const { questions } = props;

  const { setQuizStateField, setMaxQuizTime } = useAppActions();
  const { setResult, getResult, getTimer } = useLocalStorage();

  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const currentResult = useSelector(getQuizStateField('currentResult'));
  const allQuestionsCompleted = useSelector(getQuizStateField('allQuestionsCompleted'));

  useLayoutEffect(() => {
    const oldTimer = getTimer();
    const oldResult = getResult();
    if (!!oldTimer && !!oldResult) {
      setQuizStateField({
        field: 'quizTimer',
        data: oldTimer.timer,
      });
      setQuizStateField({
        field: 'currentResult',
        data: oldResult.answers,
      });

      setQuizStateField({
        field: 'questionIndex',
        data: oldResult.answers.length,
      });
      setQuizStateField({
        field: 'allQuestionsCompleted',
        data: questions?.length === oldResult.answers.length,
      });
    } else {
      setMaxQuizTime({ questionsCounter: questions?.length ?? 0 });
    }
    setQuizStateField({
      field: 'isStarted',
      data: true,
    });
    setQuizStateField({
      field: 'questions',
      data: questions ?? [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentResult.length > 0) setResult(currentResult);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentResult]);

  if (!questions) {
    return (
      <Typography
        align="center"
        component="h4"
        className="mt-10! w-full! text-4xl! font-bold! text-slate-300 uppercase!"
      >
        Нет данных для отображения
      </Typography>
    );
  }

  if (allQuestionsCompleted) {
    return <ResultList />;
  }

  return (
    <List
      id="QuestionList"
      className="mx-auto! flex w-full max-w-5xl flex-col gap-2 px-4!"
    >
      {questions.map((question, index) => {
        return (
          <Box key={`QuestionListItem-${index}`}>
            {index < questionsIndex && (
              <QuestionListItemClosed question={question} index={index + 1} type="prev" />
            )}

            {index === questionsIndex && (
              <QuestionListItemOpened question={question} index={index + 1} />
            )}
            {index > questionsIndex && (
              <QuestionListItemClosed question={question} index={index + 1} type="next" />
            )}
          </Box>
        );
      })}
    </List>
  );
};

const MemoQuestionList = React.memo(QuestionList);
export { MemoQuestionList as QuestionList };
