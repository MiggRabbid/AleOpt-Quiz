// Библиотеки
import React from 'react';
import clsx from 'clsx';
import { Button, Typography } from '@mui/material';

interface IQuestionListItemOpenedBtnProps {
  onConfirmAnswer: () => void;
  disabled?: boolean;
}

const QuestionListItemOpenedBtn = (props: IQuestionListItemOpenedBtnProps) => {
  const { onConfirmAnswer, disabled } = props;

  const typographyClasses = clsx('w-full font-semibold! text-white', {
    'font-medium! text-emerald-300!': disabled,
    'font-semibold! text-white!': !disabled,
  });

  return (
    <Button
      onClick={onConfirmAnswer}
      disabled={disabled}
      className="rounded-xl! border-0! bg-emerald-600! px-4! py-4! hover:shadow-md hover:bg-emerald-500! disabled:bg-emerald-50! disabled:bg-emerald-200!"
    >
      <Typography
        align="left"
        className={typographyClasses}
      >
        Подтвердить
      </Typography>
    </Button>
  );
};

const memoQuestionListItemOpenedBtn = React.memo(QuestionListItemOpenedBtn);
export { memoQuestionListItemOpenedBtn as QuestionListItemOpenedBtn };
