'use client';

import { Button, CircularProgress } from '@mui/material';

interface IBtnLoginProps {
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

const BtnLogin = (props: IBtnLoginProps) => {
  const { isDisabled, isSubmitting } = props;
  return (
    <Button
      type="submit"
      variant="contained"
      color="success"
      fullWidth
      disabled={isSubmitting || isDisabled}
      className="min-h-14! h-14! rounded-xl!"
    >
      {isSubmitting && (
        <>
          <CircularProgress
            color="success"
            className="min-w-6! w-6! min-h-6! h-6! mr-4"
          />
          <p>Проверяем данные...</p>
        </>
      )}
      {!isSubmitting && 'Войти'}
    </Button>
  );
};

export { BtnLogin };
