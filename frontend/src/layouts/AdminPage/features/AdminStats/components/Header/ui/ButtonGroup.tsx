import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { TypeStatsTab } from '@/layouts/AdminPage/types/AdminStats';

interface ICustomButtonGroupProps {
  activeTab: TypeStatsTab;
  setState: Dispatch<SetStateAction<TypeStatsTab>>;
}

const CustomButtonGroup = (props: ICustomButtonGroupProps) => {
  const { activeTab, setState } = props;
  const isUsersActive = activeTab === TypeStatsTab.users;
  const isQuestionActive = activeTab === TypeStatsTab.questions;
  return (
    <ButtonGroup className="h-fit rounded-xl! shadow-xl!">
      <Button
        color="success"
        className={`h-10! min-h-10! w-40! min-w-40! rounded-s-xl! leading-none! font-bold! shadow-none! outline-0! ${!isUsersActive ? 'bg-white!' : ''}`}
        variant={isUsersActive ? 'contained' : 'text'}
        onClick={() => setState(TypeStatsTab.users)}
      >
        Сотрудники
      </Button>
      <Button
        color="success"
        className={`h-10! min-h-10! w-40! min-w-40! rounded-e-xl! leading-none! font-bold! shadow-none! outline-0! ${!isQuestionActive ? 'bg-white!' : ''}`}
        variant={isQuestionActive ? 'contained' : 'text'}
        onClick={() => setState(TypeStatsTab.questions)}
      >
        Вопросы
      </Button>
    </ButtonGroup>
  );
};

export { CustomButtonGroup as ButtonGroup };
