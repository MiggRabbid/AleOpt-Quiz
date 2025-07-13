'use client';
// Библиотеки
import React, { useEffect, useLayoutEffect } from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';
// Логика
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { QuestionListItemOpened } from './ui/QuestionListItemOpened';
import { QuestionListItemClosed } from './ui/QuestionListItemClosed';
//Типизация
import { iQuestion } from '@/types/quiz';
import { ResultList } from '../ResultList/ResultList';
import { PlugForEmptyData } from '@/shared/ui/ui/other/PlugForEmptyData';

interface IQuestionListProps {
  questions: iQuestion[] | null;
}

const QuestionList = (props: IQuestionListProps) => {
  const { questions } = props;

  const { setQuizStateField, setMaxQuizTime } = useAppActions();
  const { setResult, getResult, getTimer } = useLocalStorage();

  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));
  const currentResult = useAppSelector(getQuizStateField('currentResult'));
  const allQuestionsCompleted = useAppSelector(
    getQuizStateField('allQuestionsCompleted'),
  );

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
    return <PlugForEmptyData />;
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
          <Box key={`QuestionListItem-${index}`} className="w-full">
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
