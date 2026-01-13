// Библиотеки
import { memo } from 'react';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui/';
import { QuestionListItem } from './components';
// Типизация
import type { iQuestion } from '@app/types';

interface IQuestionListProps {
  questions?: iQuestion[];
}

const QuestionList = memo(({ questions }: IQuestionListProps) => {
  if (!questions) {
    return <PlugForEmptyData />;
  }

  return (
    <>
      {questions.map((question: iQuestion, index: number) => {
        return (
          <QuestionListItem
            key={`QuestionListItem-${question.id}-${index}`}
            question={question}
            index={index + 1}
          />
        );
      })}
    </>
  );
});

export { QuestionList };
