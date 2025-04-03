import { Box, Typography } from '@mui/material';
import { QuestionSummary } from '../utils/getQuestionSummaryFromAttempts';

interface IQuestionBlockItemProps {
  isEasiest: boolean;
  index: number;
  question: QuestionSummary | null;
}

const QuestionBlockItem = (props: IQuestionBlockItemProps) => {
  const { isEasiest, index, question } = props;

  const questionText = !!question ? question.question.replace(':', '') : 'Нет данных';
  const answerCount = !!question ? question.countAnswers : '-';
  const answerAttempt = !!question ? question.totalAnswers : '-';

  const answerCountText = isEasiest ? 'Правильных ответов:' : 'Неправильных ответов:';

  return (
    <Box className="flex h-fit! w-full! shrink-0 grow flex-col justify-center gap-1 py-3">
      <Typography align="left" className="ms-4! text-base!">
        {index + 1}
        {') '}
        {questionText}
      </Typography>
      <Box className="flex h-fit! w-full! justify-between gap-1 px-6">
        <Typography
          align="left"
          className={`ms-4! w-fit! text-sm! font-semibold! text-slate-500`}
        >
          {`${answerCountText} `}
          <Typography
            component="span"
            align="right"
            className={`ms-1! w-fit! text-sm! font-semibold! ${isEasiest ? 'text-emerald-700' : 'text-rose-700'}`}
          >
            {answerCount}
          </Typography>
        </Typography>
        <Typography
          align="right"
          className="ms-4! w-fit! text-sm! font-semibold! text-slate-500"
        >
          {`Всего попыток: ${answerAttempt}`}
        </Typography>
      </Box>
    </Box>
  );
};

export { QuestionBlockItem };
