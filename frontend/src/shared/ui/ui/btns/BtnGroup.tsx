import { Box, Button, CircularProgress } from '@mui/material';

type btnVariant = 'text' | 'contained' | 'outlined';
type btnColor =
  | 'success'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'warning';
type btnType = 'button' | 'reset' | 'submit';

interface IBtnGroupProps {
  leftBtnText: string;
  leftBtnClick?: () => void;
  leftBtnVariant?: btnVariant;
  leftBtnColor?: btnColor;
  rightBtnText: string;
  rightBtnClick?: () => void;
  rightBtnVariant?: btnVariant;
  rightBtnColor?: btnColor;
  rightBtnType?: btnType;
  disabledRight?: boolean;
  isLoading?: boolean;
}

const BtnGroup = (props: IBtnGroupProps) => {
  const {
    isLoading,
    leftBtnText,
    leftBtnClick,
    leftBtnColor,
    leftBtnVariant,
    rightBtnText,
    rightBtnClick,
    rightBtnColor,
    rightBtnVariant,
    rightBtnType = 'button',
    disabledRight,
  } = props;

  return (
    <Box className="flex w-full items-center gap-x-5 gap-y-2">
      <Button
        onClick={leftBtnClick}
        variant={leftBtnVariant}
        color={leftBtnColor}
        disabled={isLoading}
        className="min-h-10! flex-1! rounded-xl! border-0! shadow-xl! outline-0!"
      >
        {leftBtnText}
      </Button>
      <Button
        onClick={rightBtnType === 'submit' ? undefined : rightBtnClick}
        variant={rightBtnVariant}
        color={rightBtnColor}
        type={rightBtnType}
        disabled={isLoading || disabledRight}
        className="min-h-10! flex-1! items-center justify-center gap-2 rounded-xl! shadow-xl!"
      >
        {isLoading && <CircularProgress sx={{ color: 'white !important' }} size={30} />}
        {rightBtnText}
      </Button>
    </Box>
  );
};

export { BtnGroup };
