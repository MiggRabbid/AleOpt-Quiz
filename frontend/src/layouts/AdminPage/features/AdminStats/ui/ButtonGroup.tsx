import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Dispatch, SetStateAction } from 'react';
import { TypeStatsTab } from '../../../types/AdminStats';

interface ICustomButtonGroupProps {
  activeTab: TypeStatsTab;
  setState: Dispatch<SetStateAction<TypeStatsTab>>;
}

const CustomButtonGroup = (props: ICustomButtonGroupProps) => {
  const { activeTab, setState } = props;
  return (
    <ButtonGroup className="h-10! min-h-10! rounded-xl!">
      <Button
        color="success"
        className="h-10! min-h-10! rounded-s-xl!"
        variant={activeTab === TypeStatsTab.users ? 'contained' : 'outlined'}
        onClick={() => setState(TypeStatsTab.users)}
      >
        Сотрудники
      </Button>
      <Button
        color="success"
        className="h-10! min-h-10! rounded-e-xl!"
        variant={activeTab === TypeStatsTab.questions ? 'contained' : 'outlined'}
        onClick={() => setState(TypeStatsTab.questions)}
      >
        Вопросы
      </Button>
    </ButtonGroup>
  );
};

export { CustomButtonGroup as ButtonGroup };
