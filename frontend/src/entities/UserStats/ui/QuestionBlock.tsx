import { Box, Typography } from '@mui/material';
import { QuestionSummary } from '../utils/getQuestionSummaryFromAttempts';
import { QuestionBlockItem } from './QuestionBlockItem';

interface IEasiestQuestionProps {
  type: 'easiest' | 'hardest';
  questions: QuestionSummary[] | null;
}

const QuestionBlock = (props: IEasiestQuestionProps) => {
  const { type, questions } = props;

  const isEasiest = type === 'easiest';

  const titleText = isEasiest ? 'Самые лёгкий вопросы' : 'Самый сложные вопросы';

  return (
    <Box className="flex max-h-150 min-h-64 w-1/2 grow flex-col justify-start gap-1">
      <Typography
        align="center"
        className="ms-4! w-fit! text-lg! font-semibold! uppercase"
      >
        {titleText}
      </Typography>
      <Box className="flex min-h-fit grow flex-col justify-start gap-2">
        {!questions && (
          <QuestionBlockItem isEasiest={isEasiest} question={null} index={0} />
        )}
        {!!questions &&
          questions.map((question, index: number) => {
            return (
              <QuestionBlockItem
                isEasiest={isEasiest}
                key={`QuestionBlockItem-${index}`}
                question={question}
                index={index}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export { QuestionBlock };
