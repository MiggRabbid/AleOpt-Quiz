// Библиотеки
import { Box } from '@mui/material';
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
    <Box className="mx-auto! flex h-full! w-full max-w-5xl flex-col gap-2 px-4!">
      {questions.map((question: iQuestion, index: number) => {
        return (
          <QuestionListItem
            key={`QuestionListItem-${question.id}-${index}`}
            question={question}
            index={index + 1}
          />
        );
      })}
    </Box>
  );
};

export { QuestionList };
