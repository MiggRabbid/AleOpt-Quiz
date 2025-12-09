// Библиотеки
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface IBtnMainProps {
  btnText: string;
  btnClick?: () => void;
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'success' | 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'warning';
}

const BtnMain = (props: IBtnMainProps) => {
  const {
    btnText,
    btnClick,
    fullWidth,
    isLoading,
    variant = 'text',
    color = 'success',
  } = props;
  return (
    <Button
      onClick={btnClick}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      className={`h-14! min-h-14! rounded-xl! ${variant === 'text' ? 'bg-white!' : ''} outline-0!" leading-none! font-bold! shadow-md!`}
      sx={{
        paddingX: '20px',
        paddingY: '5px',
      }}
    >
      {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
      {!isLoading && btnText}
    </Button>
  );
};

export { BtnMain };
