import { BtnSmall } from '@/shared/ui';

import { TypeStatsTab } from '../../../component.types';

interface IBtnAddProps {
  activeTab: TypeStatsTab;
  openEditor: () => void;
}

const BtnAdd = (props: IBtnAddProps) => {
  const { activeTab, openEditor } = props;

  const btnText = `Добавить ${activeTab === TypeStatsTab.users ? 'сотрудника' : 'вопрос'}`;

  return (
    <BtnSmall
      btnText={btnText}
      variant="text"
      btnClick={openEditor}
      disabled={activeTab === TypeStatsTab.users}
    />
  );
};

export { BtnAdd };
