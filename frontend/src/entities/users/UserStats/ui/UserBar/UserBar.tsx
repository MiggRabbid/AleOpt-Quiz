import { Bar } from 'react-chartjs-2';
import { typeStatFuncsArgs } from '../../../../../types/iStats';
import { getDatasetForBar, getOptionsForBar } from './utils/data&OptionsForBar';

const UserBar: React.FC<{ userStats: typeStatFuncsArgs }> = (props) => {
  const { userStats } = props;

  const dataBar = getDatasetForBar(userStats);
  const optionsBar = getOptionsForBar(userStats);

  return (
    <article className="p-2 w-100 h-100 card shadow-sm">
      <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
        Диаграмма ответов
      </p>
      <div className="w-100 h-100">
        <Bar data={dataBar} options={optionsBar} />
      </div>
    </article>
  );
};

export default UserBar;
