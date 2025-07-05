import { BtnSmall } from '@/shared/ui/ui/btns/BtnSmall';
import { TypeStatsTab } from '../../../types/AdminStats';

const BtnAdd = ({ activeTab }: { activeTab: TypeStatsTab }) => {
  const btnText = `Добавить ${activeTab === TypeStatsTab.users ? 'сотрудника' : 'вопрос'}`;
  return <BtnSmall btnText={btnText} variant="outlined" />;
};

export { BtnAdd };
