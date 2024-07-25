import { Doughnut } from 'react-chartjs-2';

import { getDataAnswersForDoughnut } from './utils/forDataDoughnut';

import { typeDoughnut, typeStatFuncsArgs } from '../../../../../types/iStats';
import {
  getDatasetForDoughnut,
  getOptionsForDoughnut,
} from './utils/data&OptionsForDoughnut';

interface iUserDoughnutProps {
  userStats: typeStatFuncsArgs;
  type: typeDoughnut;
}

const UserDoughnut: React.FC<iUserDoughnutProps> = (props) => {
  const { type, userStats } = props;

  const currLabel = `Самые ${type === typeDoughnut.easy ? 'лёгкие' : 'сложные'} вопросы`;

  const questionsStats = getDataAnswersForDoughnut(userStats);
  const dataDoughnut = getDatasetForDoughnut(type, currLabel, questionsStats);
  const optionsDoughnut = getOptionsForDoughnut(
    questionsStats,
    currLabel,
    type,
  );
  const bgColor =
    type === typeDoughnut.easy ? 'bg-success-subtle' : 'bg-danger-subtle';
  return (
    <article
      className={`w-auto h-100 py-3 px-5 card shadow-sm ${bgColor}`}
      id={`${type}UserDoughnut`}
    >
      <p className="p-0 m-0 mb-2 text-center text-uppercase fs-5 fw-semibold">
        {currLabel}
      </p>
      <div className="w-100 h-100">
        <Doughnut data={dataDoughnut} options={optionsDoughnut} />
      </div>
    </article>
  );
};

export default UserDoughnut;
