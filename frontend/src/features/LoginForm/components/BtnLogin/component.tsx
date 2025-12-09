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
      className="h-14! min-h-14! rounded-xl!"
    >
      {isSubmitting && (
        <>
          <CircularProgress
            color="success"
            className="mr-4 h-6! min-h-6! w-6! min-w-6!"
          />
          <p>Вхожу...</p>
        </>
      )}
      {!isSubmitting && (
        <>
          <p>Войти</p>
        </>
      )}
    </Button>
  );
};

export default BtnLogin;
