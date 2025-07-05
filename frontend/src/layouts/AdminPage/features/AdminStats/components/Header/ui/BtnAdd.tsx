import { BtnSmall } from '@/shared/ui/ui/btns/BtnSmall';

import { TypeStatsTab } from '@/layouts/AdminPage/types/AdminStats';

interface IBtnAddProps {
  activeTab: TypeStatsTab;
  openEditor: () => void;
}

const BtnAdd = (props: IBtnAddProps) => {
  const { activeTab, openEditor } = props;
  const btnText = `Добавить ${activeTab === TypeStatsTab.users ? 'сотрудника' : 'вопрос'}`;
  return <BtnSmall btnText={btnText} variant="outlined" btnClick={openEditor} />;
};

export { BtnAdd };
