import { Badge, Spinner, Table } from 'react-bootstrap';
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

import { useGetUserStatsQuery } from '../../../app/store/api/stats.api';

import { typeApiResponse } from '../../../types/types';
import UserBar from './ui/UserBar/UserBar';
import UserDoughnut from './ui/UserDoughnut/UserDoughnut';
import { iResultEntry } from '../../../types/iUser';
import { typeDoughnut } from '../../../types/iStats';

interface iUserStatsProps {
  username: string;
  headers: typeApiResponse;
}

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
);

const getBadgeStyle = (numberAttempts: number): string => {
  if (numberAttempts >= 60) {
    return 'success';
  }
  if (numberAttempts <= 50) {
    return 'danger';
  }
  return 'warning';
};

const UserStats: React.FC<iUserStatsProps> = (props) => {
  const { username, headers } = props;
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
          <div className="h-auto w-100 mb-4 d-flex flex-row">
            <div className="w-50 h-100 px-2 d-flex justify-content-center align-items-center">
              <article className="card py-3 shadow-sm w-100 d-flex flex-column">
                <div className="">
                  <p className="p-0 m-0 me-1 text-center text-uppercase fs-5 fw-semibold d-flex flex-row justify-content-center">
                    За последние {userStats.numberAttempts} попыток
                  </p>
                  <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold d-flex flex-row justify-content-center">
                    средний балл
                    <Badge
                      bg={getBadgeStyle(userStats.averageResult)}
                      className="ms-2 py-2 px-4"
                    >
                      {userStats.averageResult}%
                    </Badge>
                  </p>
                </div>
                <div className="mt-5 d-flex flex-column justify-content-center gap-2">
                  <Table striped bordered className="w-100 m-0 mb-2">
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold"
                        >
                          Результаты последних попыток
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold">
                          Дата
                        </th>
                        <th className="p-0 m-0 py-1 text-center text-uppercase fs-5 fw-semibold">
                          Результат
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
                              <Badge
                                bg={getBadgeStyle(userStats.averageResult)}
                                className="py-2 px-4 mx-0 my-1"
                              >
                                {Math.floor(
                                  (item.correctAnswers / item.answers.length) *
                                    100,
                                )}
                                %
                              </Badge>
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
          <div className="h-auto w-100 d-flex flex-row">
            <div className="w-50 h-100 px-2 d-flex justify-content-center align-items-center">
              <UserDoughnut userStats={userStats} type={typeDoughnut.easy} />
            </div>
            <div className="w-50 h-100 px-2 d-flex justify-content-center align-items-center">
              <UserDoughnut userStats={userStats} type={typeDoughnut.hard} />
            </div>
          </div>
        </>
      )}

      {(isFetching || isLoading) && (
        <Spinner animation="border" variant="success">
          <span className="visually-hidden">Получение данных...</span>
        </Spinner>
      )}
      {!!requestError && (
        <article className="w-100 p-2 card shadow-sm">
          <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
            Ошибка! Данные не загружены
          </p>
        </article>
      )}
    </section>
  );
};

export default UserStats;
