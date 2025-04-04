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

  const answerCountText = isEasiest ? 'Верных ответов:' : 'Неверных ответов:';

  return (
    <Box
      className={`flex h-fit! w-full! shrink-0 grow flex-col justify-center gap-2 rounded-xl border-2 px-4 py-1 ${isEasiest ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'}`}
    >
      <Box
        className={`flex flex-row gap-2 border-b-2 pb-2 ${isEasiest ? 'border-emerald-100' : 'border-rose-100'}`}
      >
        <Typography
          align="left"
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-base! ${isEasiest ? 'bg-emerald-100' : 'bg-rose-100'}`}
        >
          {index + 1}
        </Typography>

        <Typography align="left" className="text-base!">
          {questionText}
        </Typography>
      </Box>
      <Box className="flex h-fit! w-full! justify-between gap-1 pr-6 pl-9">
        <Typography
          align="left"
          className={`text-normal! w-fit! font-semibold! text-slate-500`}
        >
          {`${answerCountText} `}
          <Typography
            component="span"
            align="left"
            className={`text-normal! ms-1! w-fit! font-semibold! ${isEasiest ? 'text-emerald-700' : 'text-rose-700'}`}
          >
            {answerCount}
          </Typography>
        </Typography>
        <Typography
          align="right"
          className="text-normal! w-fit! font-semibold! text-slate-500"
        >
          {`Всего попыток: ${answerAttempt}`}
        </Typography>
      </Box>
    </Box>
  );
};

export { QuestionBlockItem };
