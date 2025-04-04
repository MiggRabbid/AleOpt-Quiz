'use client';
// Библиотеки
import React, { useEffect } from 'react';
import List from '@mui/material/List';
import { Typography } from '@mui/material';
// Компоненты
import { QuestionListItemOpened } from './components/QuestionListItemOpened';
import { QuestionListItemClosed } from './components/QuestionListItemClosed';
//Типизация
import { iQuestion } from '@/types/quiz';
import { useSelector } from 'react-redux';
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';

interface IQuestionListProps {
  questions: iQuestion[] | null;
}

const QuestionList = (props: IQuestionListProps) => {
  const { questions } = props;

  const { setQuizStateField } = useAppActions();
  const { setResult } = useLocalStorage();

  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const currentResult = useSelector(getQuizStateField('currentResult'));

  useEffect(() => {
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

  return (
    <List className="flex w-full flex-col gap-2 px-4!">
      {questions.map((question, index) => {
        return (
          <React.Fragment key={`QuestionListItem-${index}`}>
            {index < questionsIndex && (
              <QuestionListItemClosed question={question} index={index + 1} type="prev" />
            )}

            {index === questionsIndex && (
              <QuestionListItemOpened question={question} index={index + 1} />
            )}
            {index > questionsIndex && (
              <QuestionListItemClosed question={question} index={index + 1} type="next" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

const MemoQuestionList = React.memo(QuestionList);
export { MemoQuestionList as QuestionList };
