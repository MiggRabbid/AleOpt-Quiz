'use client';

import { useAppSelector } from '@/hooks';
import { getQuizStateField } from '@/selectors';

import { Box, List } from '@mui/material';
import { ResultListItem } from './ui/ResultListItem';

const ResultList = () => {
  const currentResult = useAppSelector(getQuizStateField('currentResult'));

  return (
    <Box id="ResultList" className="h-full w-full overflow-y-auto!">
      <List className="mx-auto! flex w-full max-w-7xl flex-col gap-2 overflow-y-auto! px-4! py-2">
        {currentResult.map((question, index) => (
          <ResultListItem
            key={`question-${question.questionId}-${index}`}
            question={question}
            index={index}
          />
        ))}
      </List>
    </Box>
  );
};

export { ResultList };
