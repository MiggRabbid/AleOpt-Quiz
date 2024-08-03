import { Doughnut } from 'react-chartjs-2';

import { getDataAnswersForDoughnut } from './utils/forDataDoughnut';
import { getDatasetForDoughnut, getOptionsForDoughnut } from './utils/data&OptionsForDoughnut';

import { typeDoughnut, typeStatFuncsArgs } from '../../../../../types/iStats';

interface iUserDoughnutProps {
  userStats: typeStatFuncsArgs;
  type: typeDoughnut;
}

const UserDoughnut: React.FC<iUserDoughnutProps> = (props) => {
  const { type, userStats } = props;

  const currLabel = `Самые ${type === typeDoughnut.easy ? 'лёгкие' : 'сложные'} вопросы`;

  const questionsStats = getDataAnswersForDoughnut(userStats);
  const dataDoughnut = getDatasetForDoughnut(type, currLabel, questionsStats);
  const optionsDoughnut = getOptionsForDoughnut(questionsStats, currLabel, type);
  const bgColor = type === typeDoughnut.easy ? 'bg-success-subtle' : 'bg-danger-subtle';

  return (
    <article
      className={`h-100 col-11 py-3 px-5 card shadow-sm ${bgColor}`}
      id={`${type}UserDoughnut`}
    >
      <p className="p-0 m-0 mb-2 text-center text-uppercase fs-6 fs-lg-5 fw-semibold">
        {currLabel}
      </p>
      <Doughnut data={dataDoughnut} options={optionsDoughnut} />
    </article>
  );
};

export default UserDoughnut;
