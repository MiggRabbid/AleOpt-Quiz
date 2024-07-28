import { Spinner, Table } from 'react-bootstrap';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { useTranslation } from 'react-i18next';

import { useGetUserStatsQuery } from '../../../app/store/api/stats.api';

import UserBar from './ui/UserBar/UserBar';
import UserDoughnut from './ui/UserDoughnut/UserDoughnut';
import UserStatBadge from '../../../shared/components/badge/UserStatBadge';

import { typeApiResponse } from '../../../types/types';
import { iResultEntry } from '../../../types/iUser';
import { typeDoughnut } from '../../../types/iStats';

interface iUserStatsProps {
  username: string;
  headers: typeApiResponse;
}

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const UserStats: React.FC<iUserStatsProps> = (props) => {
  const { username, headers } = props;

  const { t } = useTranslation();

  const {
    data: userStats,
    error: requestError,
    isFetching,
    isLoading,
  } = useGetUserStatsQuery({
    headers,
    params: { username },
  });

  return (
    <section className="w-100 h-100 col-12 col-md-10 h-5em col-xxl-8 col-12 d-flex flex-row flex-wrap align-items-start justify-content-evenly">
      {!!userStats && (
        <>
          <div className="h-100 w-100 mb-4 d-flex flex-row">
            <div className="w-50 h-100 px-2 d-flex justify-content-center align-items-center">
              <article className="card py-3 shadow-sm w-100 d-flex flex-column">
                <div className="">
                  <p className="p-0 m-0 me-1 text-center text-uppercase fs-5 fw-semibold d-flex flex-row justify-content-center">
                    {t('entities.userStats.lastAttempts.start')}
                    {userStats.numberAttempts}
                    {t('entities.userStats.lastAttempts.end')}
                  </p>
                  <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold d-flex flex-row justify-content-center">
                    {t('entities.userStats.averageScore')}
                    <UserStatBadge averageResult={userStats.averageResult} />
                  </p>
                </div>
                <div className="mt-5 d-flex px- flex-column justify-content-center gap-3">
                  <Table striped bordered className="w-100 m-0 mb-2">
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold"
                        >
                          {t('entities.userStats.table.title')}
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold">
                          {t('entities.userStats.table.column1')}
                        </th>
                        <th className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold">
                          {t('entities.userStats.table.column2')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.attempts.map((item: iResultEntry, index) => {
                        if (index < userStats.attempts.length - 3) return null;
                        return (
                          <tr key={`attempt${index + 1}`}>
                            <td className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold ">
                              {item.data}
                            </td>
                            <td className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
                              <UserStatBadge
                                averageResult={Math.floor(
                                  (item.correctAnswers / item.answers.length) * 100,
                                )}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </article>
            </div>
            <div className="w-50 h-100 px-2 d-flex justify-content-center align-items-center">
              <UserBar userStats={userStats} />
            </div>
          </div>
          <div className="w-100 d-flex flex-row">
            <div className="w-50 px-2 d-flex justify-content-center align-items-center">
              <UserDoughnut userStats={userStats} type={typeDoughnut.easy} />
            </div>
            <div className="w-50 px-2 d-flex justify-content-center align-items-center">
              <UserDoughnut userStats={userStats} type={typeDoughnut.hard} />
            </div>
          </div>
        </>
      )}

      {(isFetching || isLoading) && (
        <Spinner animation="border" variant="success">
          <span className="visually-hidden">{t('entities.userStats.isLoading')}</span>
        </Spinner>
      )}
      {!!requestError && (
        <article className="w-100 p-2 card shadow-sm">
          <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
            {t('entities.userStats.requestError')}
          </p>
        </article>
      )}
    </section>
  );
};

export default UserStats;
