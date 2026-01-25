// Библиотеки
import Box from '@mui/material/Box';
import { BtnMain, type IBtnMainProps } from './BtnMain';

interface IBtnGroupProps {
  leftBtnText: string;
  leftBtnClick?: () => void;
  leftBtnVariant?: IBtnMainProps['variant'];
  leftBtnColor?: IBtnMainProps['color'];
  rightBtnText: string;
  rightBtnClick?: () => void;
  rightBtnVariant?: IBtnMainProps['variant'];
  rightBtnColor?: IBtnMainProps['color'];
  rightBtnType?: IBtnMainProps['type'];
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
      <BtnMain
        btnClick={leftBtnClick}
        variant={leftBtnVariant}
        color={leftBtnColor}
        disabled={isLoading}
        fullWidth={true}
        btnText={leftBtnText}
      />
      <BtnMain
        btnClick={rightBtnType === 'submit' ? undefined : rightBtnClick}
        variant={rightBtnVariant}
        color={rightBtnColor}
        type={rightBtnType}
        disabled={isLoading || disabledRight}
        isLoading={isLoading}
        fullWidth={true}
        btnText={rightBtnText}
      />
    </Box>
  );
};

export { BtnGroup };
