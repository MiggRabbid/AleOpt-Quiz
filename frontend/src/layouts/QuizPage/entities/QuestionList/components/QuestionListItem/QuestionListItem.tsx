// Библиотеки
import { memo } from 'react';
// Логика
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { QuestionListItemClosed } from './QuestionListItemClosed';
import { QuestionListItemOpened } from './QuestionListItemOpened';
// Типизация
import { iQuestion } from '@/types/quiz.types';

const QuestionListItem = ({
  currIndex,
  question,
}: {
  currIndex: number;
  question: iQuestion;
}) => {
  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));

  return (
    <>
      {currIndex < questionsIndex ? (
        <QuestionListItemClosed question={question} index={currIndex + 1} type="prev" />
      ) : currIndex === questionsIndex ? (
        <QuestionListItemOpened question={question} index={currIndex + 1} />
      ) : (
        <QuestionListItemClosed question={question} index={currIndex + 1} type="next" />
      )}
    </>
  );
};

export default memo(QuestionListItem);
