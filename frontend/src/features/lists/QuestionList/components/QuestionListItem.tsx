// Библиотеки
import { memo, useEffect, useMemo } from 'react';
import { Box, Divider, Typography } from '@mui/material';
// Логика
import { useAppActions } from '@app/hooks';
// Компоненты
import { AnswerListItem, QuestionStats } from '.';
import { BtnGroupEdit, CustomAppChip, TooltipTypography } from '@/shared/ui';
// Типизация
import type { MouseEvent } from 'react';
import type {
  iQuestion,
  IQuestionStatsForAllUsers,
  typeQuestionAnswer,
} from '@app/types';
import { TTypeModal } from '@app/types';
import { CustomAccordion } from '@/shared/ui/other/CustomAccordion';
import { useGetQuestionStats } from '@/app/api/hooks';
import { useQuery } from '@tanstack/react-query';

interface IQuestionListItemProps {
  question: iQuestion;
  index: number;
}

const QuestionListItem = (props: IQuestionListItemProps) => {
  const { index, question } = props;
  const { openQuestionEditor } = useAppActions();

  const { data: questionStats } = useQuery({
    ...useGetQuestionStats({ params: { id: question.id } }),
  });

  const handelClickOnEdit = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuestionEditor({
      type: TTypeModal.edit,
      editableQuestion: question,
    });
  };

  const handelClickOnDelete = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuestionEditor({
      type: TTypeModal.delete,
      editableQuestion: question,
    });
  };

  return (
    <CustomAccordion
      ariaControls={`QuestionListItem-${question.id}`}
      SummaryChildren={
        <QuestionListItemSummary
          index={index}
          question={question.question}
          questionStats={questionStats ?? null}
        />
      }
      DetailsChildren={
        <QuestionListItemDetails
          questionId={question.id}
          correctAnswerId={question.correctAnswerId}
          answers={question.answers}
          questionStats={questionStats ?? null}
          handelClickOnEdit={handelClickOnEdit}
          handelClickOnDelete={handelClickOnDelete}
        />
      }
    />
  );
};

const QuestionListItemMemo = memo(QuestionListItem);
export { QuestionListItemMemo as QuestionListItem };

const QuestionListItemSummary = ({
  index,
  questionStats,
  question,
}: {
  index: number;
  questionStats: IQuestionStatsForAllUsers | null;
  question: string;
}) => {
  const results: number | null = useMemo(() => {
    if (!questionStats || questionStats.results.length === 0) return null;

    let numberAttempts = 0;
    let correctAnswers = 0;

    questionStats.results.forEach((item) => {
      numberAttempts += item.numberAttempts;
      correctAnswers += item.correctAnswers;
    });
    return numberAttempts ? Math.round((correctAnswers / numberAttempts) * 100) : 0;
  }, [questionStats]);

  console.log(results);

  return (
    <Box className="flex grow-1 items-center">
      <Typography className="me-3! flex h-6! w-6! shrink-0! items-center justify-center rounded-full! bg-slate-500! text-xs! leading-none! font-bold! text-slate-50!">
        {index}
      </Typography>

      <Box className="me-4! grow-0">
        <TooltipTypography
          maxRows={2}
          tooltip={{
            content: question,
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
          {question}
        </TooltipTypography>
      </Box>
      <Box className="ms-auto me-3 shrink-0">
        <CustomAppChip result={results} />
      </Box>
    </Box>
  );
};

const QuestionListItemDetails = ({
  questionId,
  correctAnswerId,
  answers,
  questionStats,
  handelClickOnDelete,
  handelClickOnEdit,
}: {
  questionId: string;
  correctAnswerId: string;
  answers: typeQuestionAnswer[];
  questionStats: IQuestionStatsForAllUsers | null;
  // eslint-disable-next-line no-unused-vars
  handelClickOnDelete: (e: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  handelClickOnEdit: (e: MouseEvent) => void;
}) => {
  return (
    <Box className="flex h-fit! w-full! flex-col justify-start gap-4">
      <Box className="w-full!">
        <Box className="flex w-full! justify-between py-2! ps-6!">
          <Typography component="p" className="font-semibold! text-slate-500!">
            Текущий верный ответ:
            <Typography
              component="span"
              className="ps-2 font-semibold! text-slate-500! uppercase!"
            >
              {correctAnswerId}
            </Typography>
          </Typography>
          <BtnGroupEdit
            onClickDelete={handelClickOnDelete}
            colorDelete="error"
            onClickEdit={handelClickOnEdit}
            colorEdit="success"
            size="small"
          />
        </Box>
        <Divider />
      </Box>
      <Box className="flex w-full! flex-col gap-2">
        {answers.map((answer) => {
          return (
            <AnswerListItem
              key={`AnswerListItem-${questionId}-${answer.id}`}
              answer={answer}
              isCorrect={answer.id === correctAnswerId}
            />
          );
        })}
      </Box>

      <Divider />

      <QuestionStats questionStats={questionStats} />
    </Box>
  );
};
