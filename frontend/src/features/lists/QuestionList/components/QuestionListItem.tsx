// Библиотеки
import { memo } from 'react';
import { Box, Divider, Typography } from '@mui/material';
// Логика
import { useAppActions } from '@app/hooks';
// Компоненты
import { AnswerListItem } from '.';
import { BtnGroupEdit, TooltipTypography } from '@/shared/ui';
// Типизация
import type { MouseEvent } from 'react';
import type { iQuestion, typeQuestionAnswer } from '@app/types';
import { TTypeModal } from '@app/types';
import { CustomAccordion } from '@/shared/ui/other/CustomAccordion';

interface IQuestionListItemProps {
  question: iQuestion;
  index: number;
}

const QuestionListItem = (props: IQuestionListItemProps) => {
  const { index, question } = props;
  const { openQuestionEditor } = useAppActions();

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
        <QuestionListItemSummary index={index} question={question.question} />
      }
      DetailsChildren={
        <QuestionListItemDetails
          questionId={question.id}
          correctAnswerId={question.correctAnswerId}
          answers={question.answers}
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
  question,
}: {
  index: number;
  question: string;
}) => {
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
    </Box>
  );
};

const QuestionListItemDetails = ({
  questionId,
  correctAnswerId,
  answers,
  handelClickOnDelete,
  handelClickOnEdit,
}: {
  questionId: string;
  correctAnswerId: string;
  answers: typeQuestionAnswer[];
  handelClickOnDelete: (e: MouseEvent) => void;
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
              className="font-semibold! text-slate-500! uppercase!"
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
    </Box>
  );
};
