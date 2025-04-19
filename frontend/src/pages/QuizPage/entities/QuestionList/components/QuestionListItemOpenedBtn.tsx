import { Button, Typography } from '@mui/material';
import React from 'react';

interface IQuestionListItemOpenedBtnProps {
  onConfirmAnswer: () => void;
  disabled?: boolean;
}

const QuestionListItemOpenedBtn = (props: IQuestionListItemOpenedBtnProps) => {
  const { onConfirmAnswer, disabled } = props;
  return (
    <Button
      onClick={onConfirmAnswer}
      disabled={disabled}
      className="rounded-xl! border-0! bg-green-600! px-4! py-4! hover:bg-green-500! disabled:bg-green-50! disabled:bg-green-200!"
    >
      <Typography
        align="left"
        className={`${disabled ? 'font-medium! text-green-300!' : 'font-semibold! text-white!'} w-full font-semibold! text-white`}
      >
        Подтвердить
      </Typography>
    </Button>
  );
};

const memoQuestionListItemOpenedBtn = React.memo(QuestionListItemOpenedBtn);
export { memoQuestionListItemOpenedBtn as QuestionListItemOpenedBtn };
