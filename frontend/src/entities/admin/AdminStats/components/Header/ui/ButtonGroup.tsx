// Библиотеки
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import clsx from 'clsx';
// Компоненты
import { CustomIcon } from '@/shared/ui/other/CustomIcon';
import { CustomCardWrapper } from '@/shared/ui';
// Типизация
import type { Dispatch, SetStateAction } from 'react';
import type { TLibraryIconMUIName } from '@/shared/ui/other/CustomIcon';
import { TypeStatsTab } from '../../../component.types';

interface ICustomButtonGroupProps {
  activeTab: TypeStatsTab;
  setState: Dispatch<SetStateAction<TypeStatsTab>>;
}

const CustomButtonGroup = (props: ICustomButtonGroupProps) => {
  const { activeTab, setState } = props;

  const isUsersActive = activeTab === TypeStatsTab.users;
  const isQuestionActive = activeTab === TypeStatsTab.questions;

  return (
    <CustomCardWrapper
      roundedSize="rounded-xl"
      shadowBaseSize="shadow-none"
      shadowSize="shadow-md"
      width="w-fit!"
    >
      <ButtonGroup className="h-fit rounded-xl!">
        <BtnItem
          text="Сотрудники"
          name="Group"
          position="left"
          isActive={isUsersActive}
          onClick={() => setState(TypeStatsTab.users)}
        />
        <BtnItem
          text="Вопросы"
          name="HelpOutline"
          position="right"
          isActive={isQuestionActive}
          onClick={() => setState(TypeStatsTab.questions)}
        />
      </ButtonGroup>
    </CustomCardWrapper>
  );
};

const BtnItem = ({
  text,
  name,
  position,
  isActive,
  onClick,
}: {
  text: string;
  isActive: boolean;
  name: TLibraryIconMUIName;
  position: 'left' | 'right';
  onClick?: () => void;
}) => {
  const positionLeft = position === 'left';

  const BtnClass = clsx(
    'flex h-10! min-h-10! w-40! min-w-40! flex-row items-center justify-center gap-2 py-2 leading-none! font-bold! shadow-none! outline-0!',
    positionLeft ? 'rounded-s-xl!' : 'rounded-e-xl!',
  );
  return (
    <Button
      color={isActive ? 'primary' : 'secondary'}
      variant="contained"
      className={BtnClass}
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: (theme) => {
            if (isActive) return theme.palette.primary.main;
            return theme.palette.secondary.main;
          },
        },
      }}
      endIcon={
        !positionLeft && (
          <Box className="h-6 w-6">
            <CustomIcon name={name} />
          </Box>
        )
      }
      startIcon={
        positionLeft && (
          <Box className="h-6 w-6">
            <CustomIcon name={name} />
          </Box>
        )
      }
    >
      {text}
    </Button>
  );
};

export { CustomButtonGroup as ButtonGroup };
