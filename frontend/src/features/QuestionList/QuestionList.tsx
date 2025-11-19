// Логика
import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';
// Компоненты
import { PlugForEmptyData } from '@/shared/ui/ui/Plug/PlugForEmptyData';
import { iQuestion } from '@/types/quiz.types';
import { QuestionListItem } from './ui/QuestionListItem';
// Типизация

const QuestionList = () => {
  const questions = useAppSelector(getQuizStateField('questions'));

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
};

export { QuestionList };
