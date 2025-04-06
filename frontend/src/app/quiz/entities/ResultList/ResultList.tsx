import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

import { Box } from '@mui/material';
import { ResultListItem } from './components/ResultListItem';

const ResultList = () => {
  const currentResult = useAppSelector(getQuizStateField('currentResult'));

  return (
    <Box
      id="ResultList"
      className="mx-auto! flex w-full max-w-5xl flex-col gap-2 px-4! py-2"
    >
      {currentResult.map((question, index) => (
        <ResultListItem
          key={`question-${question.questionId}-${index}`}
          question={question}
          index={index}
        />
      ))}
    </Box>
  );
};

export { ResultList };
