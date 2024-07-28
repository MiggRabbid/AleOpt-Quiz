import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import { getDatasetForBar, getOptionsForBar } from './utils/data&OptionsForBar';

import { typeStatFuncsArgs } from '../../../../../types/iStats';

const UserBar: React.FC<{ userStats: typeStatFuncsArgs }> = (props) => {
  const { userStats } = props;

  const { t } = useTranslation();

  const dataBar = getDatasetForBar(userStats);
  const optionsBar = getOptionsForBar(userStats);

  return (
    <article className="h-100 w-100 p-2 card shadow-sm">
      <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
        {t('entities.userBar.title')}
      </p>
      <Bar data={dataBar} options={optionsBar} />
    </article>
  );
};

export default UserBar;
