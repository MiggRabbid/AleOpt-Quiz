// Библиотеки
import { memo } from 'react';
// Логика
import { useAppSelector } from '@app/hooks';
import { getQuizStateField } from '@app/selectors';
// Компоненты
import { QuestionListItemClosed } from './QuestionListItemClosed';
import { QuestionListItemOpened } from './QuestionListItemOpened';
import { CustomListItem } from '@/shared/ui';
// Типизация
import type { iQuestion } from '@app/types';

interface IQuestionListItemProps {
  questions: iQuestion[];
  question: iQuestion;
  currIndex: number;
}

const QuestionListItem = memo(
  ({ questions, currIndex, question }: IQuestionListItemProps) => {
    const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));

    return (
      <CustomListItem
        classNames="bg-slate-50 transition-shadow duration-500 hover:shadow-md"
        paddingX="px-0!"
        paddingY="py-0!"
        shadowSize="shadow-none"
      >
        {currIndex < questionsIndex ? (
          <QuestionListItemClosed question={question} index={currIndex + 1} type="prev" />
        ) : currIndex === questionsIndex ? (
          <QuestionListItemOpened
            questions={questions}
            question={question}
            index={currIndex + 1}
          />
        ) : (
          <QuestionListItemClosed question={question} index={currIndex + 1} type="next" />
        )}
      </CustomListItem>
    );
  },
);

export { QuestionListItem };
