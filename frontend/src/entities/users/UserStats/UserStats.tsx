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

import { useGetUserStatsQuery } from '../../../app/api/stats.api';

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
    <section className="w-100 h-100 d-flex flex-row flex-wrap align-items-center align-items-lg-start justify-content-center justify-content-lg-start">
      {!!userStats && (
        <>
          <div className="col-12 w-100 mb-4 d-flex flex-column justify-content-center align-items-center gap-3">
            <div className="col-12 h-100 px-1 d-flex justify-content-center align-items-center">
              <article className="d-flex flex-column">
                <div
                  id="attemptsCount"
                  className="card shadow-sm "
                  style={{ height: '100px', width: '200px' }}
                >
                  <p className="p-0 m-0 me-1 text-center text-uppercase fs-6 fs-lg-5 fw-semibold d-flex flex-row justify-content-center">
                    {t('entities.userStats.numberAttempts')}
                    {userStats.numberAttempts}
                  </p>
                </div>
                <div
                  id="averageResult"
                  className="card shadow-sm "
                  style={{ height: '100px', width: '200px' }}
                >
                  <p className="p-0 m-0 text-center text-uppercase fs-6 fs-lg-5 fw-semibold d-flex flex-row justify-content-center">
                    {t('entities.userStats.averageScore')}
                    <UserStatBadge averageResult={userStats.averageResult} />
                  </p>
                </div>
                <div
                  id="tableResults"
                  className="mt-5 d-flex px- flex-column justify-content-center gap-3"
                >
                  <Table striped bordered className="w-100 m-0 mb-2">
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="p-0 m-0 py-2 text-center text-uppercase fs-6 fs-lg-5 fw-semibold"
                        >
                          {t('entities.userStats.table.title')}
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th className="p-0 m-0 py-2 text-center text-uppercase fs-6 fs-lg-5 fw-semibold">
                          {t('entities.userStats.table.column1')}
                        </th>
                        <th className="p-0 m-0 py-2 text-center text-uppercase fs-6 fs-lg-5 fw-semibold">
                          {t('entities.userStats.table.column2')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userStats.attempts.map((item: iResultEntry, index: number) => {
                        if (index > 2) return null;
                        return (
                          <tr key={`attempt${index + 1}`}>
                            <td className="p-0 m-0 py-2 text-center align-middle text-uppercase fs-6 fs-lg-5 fw-semibold ">
                              {item.data}
                            </td>
                            <td className="p-0 m-0 py-2 text-center text-uppercase fs-6 fs-lg-5 fw-semibold">
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
            <div className="col-12 h-100 px-1 d-flex justify-content-center align-items-center">
              <UserBar userStats={userStats} />
            </div>
          </div>
          <div className="col-11 col-md-6 col-lg-12 h-100 mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <div className="col-11 col-lg-5 d-flex justify-content-center align-items-center">
              <UserDoughnut userStats={userStats} type={typeDoughnut.easy} />
            </div>
            <div className="col-11 col-lg-5 d-flex justify-content-center align-items-center">
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
        <article className="w-75 p-2 card shadow-sm">
          <p className="p-0 m-0 text-center text-uppercase fs-6 fs-lg-5 fw-semibold">
            {t('entities.userStats.requestError')}
          </p>
        </article>
      )}
    </section>
  );
};

export default UserStats;
