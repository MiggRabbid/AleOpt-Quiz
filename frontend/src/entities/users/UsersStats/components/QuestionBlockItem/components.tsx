import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import type { QuestionSummary } from '../../utils';
import { TooltipTypography } from '@/shared/ui';

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

  const wrapperClass = clsx(
    'flex h-fit w-full shrink-0 grow-0 flex-col justify-center gap-2 rounded-xl px-3.5 py-3 shadow-none hover:shadow-lg transition-shadow duration-500',
    {
      'bg-emerald-100': isEasiest,
      'bg-rose-100': !isEasiest,
    },
  );

  const headerClass = clsx('flex flex-row gap-2 h-15 border-b-2 pb-2', {
    'border-emerald-200': isEasiest,
    'border-rose-200': !isEasiest,
  });

  const indexClass = clsx(
    'flex size-7 shrink-0 items-center justify-center rounded-full text-base',
    { 'bg-emerald-200': isEasiest, 'bg-rose-200': !isEasiest },
  );

  const answerCountClass = clsx('text-normal ms-1 w-fit font-semibold!', {
    'text-emerald-700': isEasiest,
    'text-rose-700': !isEasiest,
  });

  return (
    <Box className={wrapperClass}>
      <Box className={headerClass}>
        <Typography align="left" className={indexClass}>
          {index + 1}
        </Typography>

        <TooltipTypography
          maxRows={2}
          tooltip={{
            content: questionText,
          }}
          tooltipSlotSx={{
            tooltip: {
              sx: {
                width: '500px !important',
                minWidth: '500px !important',
              },
            },
          }}
        >
          {questionText}
        </TooltipTypography>
      </Box>
      <Box className="flex h-fit! w-full! justify-between gap-1 pr-6 pl-9">
        <Typography
          align="left"
          className={`text-normal! w-fit! font-semibold! text-slate-500`}
        >
          {`${answerCountText} `}
          <Typography component="span" align="left" className={answerCountClass}>
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
