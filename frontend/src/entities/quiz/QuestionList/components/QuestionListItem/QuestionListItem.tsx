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
  questionsLength: number;
  question: iQuestion;
  currIndex: number;
  saveAttemptResult: () => void;
}

const QuestionListItem = ({
  questionsLength,
  currIndex,
  question,
  saveAttemptResult,
}: IQuestionListItemProps) => {
  const questionsIndex = useAppSelector(getQuizStateField('questionIndex'));

  const isLastQuestion = questionsIndex === questionsLength - 1;

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
          question={question}
          isLastQuestion={isLastQuestion}
          index={currIndex + 1}
          saveAttemptResult={isLastQuestion ? saveAttemptResult : undefined}
        />
      ) : (
        <QuestionListItemClosed question={question} index={currIndex + 1} type="next" />
      )}
    </CustomListItem>
  );
};

const QuestionListItemMemo = memo(QuestionListItem);

export { QuestionListItemMemo as QuestionListItem };
