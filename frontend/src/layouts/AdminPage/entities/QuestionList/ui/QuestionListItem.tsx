import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAppActions } from '@/hooks';

import { AnswerListItem } from './AnswerListItem';
import { BtnGroupEdit } from '@/shared/ui/ui/btns';

import { TTypeModal } from '@/types/modal.types';
import { iQuestion } from '@/types/quiz.types';

interface IQuestionListItemProps {
  question: iQuestion;
  index: number;
}

const QuestionListItem = (props: IQuestionListItemProps) => {
  const { index, question } = props;
  const { openQuestionEditor } = useAppActions();

  const handelClickOnEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuestionEditor({
      type: TTypeModal.edit,
      editableQuestion: question,
    });
  };

  const handelClickOnDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuestionEditor({
      type: TTypeModal.delete,
      editableQuestion: question,
    });
  };

  return (
    <Accordion
      className="rounded-md! border-2! border-green-200! bg-green-50! shadow-sm!"
      sx={{
        '&:before': { display: 'none !important' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`UsersListItem-${question.id}`}
        id={`UsersListItem-${question.id}`}
        className="flex min-h-16! w-full! justify-between bg-green-100!"
      >
        <Box className="align-start flex w-full max-w-full items-center gap-3">
          <Typography className="flex h-6! w-fit! min-w-6! shrink-0 items-center justify-center rounded-full! bg-green-300! text-sm! leading-none! font-bold! text-slate-800!">
            {index}
          </Typography>

          <Box className="grow overflow-hidden!">
            <Typography component="span" className="h-full! w-full!">
              {`${question.question}`}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails className="flex w-full! flex-col justify-start gap-4 p-4!">
        <Box className="w-full!">
          <Box className="flex w-full! justify-between py-2! ps-6!">
            <Typography component="p" className="font-semibold! text-slate-500!">
              Текущий верный ответ:
              <Typography
                component="span"
                className="font-semibold! text-slate-500! uppercase!"
              >
                {' '}
                {question.correctAnswerId}
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
          {question.answers.map((answer) => {
            return (
              <AnswerListItem
                key={`AnswerListItem-${question.id}-${answer.id}`}
                answer={answer}
                isCorrect={answer.id === question.correctAnswerId}
              />
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export { QuestionListItem };
