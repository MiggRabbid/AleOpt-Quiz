import { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';

import { BtnAdd } from './ui/BtnAdd';
import { ButtonGroup } from './ui/ButtonGroup';

import { TypeStatsTab } from '@/layouts/AdminPage/types/AdminStats';

interface IHeaderProps {
  activeTab: TypeStatsTab;
  setActiveTab: Dispatch<SetStateAction<TypeStatsTab>>;
}

const Header = (props: IHeaderProps) => {
  const { activeTab, setActiveTab } = props;

  return (
    <Box className="mb-5 flex w-full justify-between gap-4!">
      <ButtonGroup activeTab={activeTab} setState={setActiveTab} />
      <BtnAdd activeTab={activeTab} />
    </Box>
  );
};

export { Header };
