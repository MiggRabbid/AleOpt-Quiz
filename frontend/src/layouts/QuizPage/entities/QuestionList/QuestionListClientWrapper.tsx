'use client';
// Библиотеки
import React, { useEffect, useLayoutEffect } from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';
// Логика
import { useAppActions, useAppSelector, useLocalStorage } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui/ui/Plug/PlugForEmptyData';
import { ResultList } from '../ResultList/ResultList';
//Типизация
import { IQuestionListProps } from '../../QuizPage.types';
import { QuestionListItem } from './components';

const QuestionListClientWrapper = (props: IQuestionListProps) => {
  const { questions } = props;

  const { setQuizStateField, setMaxQuizTime } = useAppActions();
  const { setResult, getResult, getTimer } = useLocalStorage();

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
    <Box id="QuestionListClientWrapper" className="h-full w-full overflow-y-auto!">
      <List id="QuestionList" className="flex shrink-1 flex-col gap-2 px-4!">
        {questions.map((question, index) => (
          <QuestionListItem
            currIndex={index}
            question={question}
            key={`QuestionListItem-${question.id}-${index}`}
          />
        ))}
      </List>
    </Box>
  );
};

const MemoQuestionList = React.memo(QuestionListClientWrapper);
export { MemoQuestionList as QuestionListClientWrapper };
