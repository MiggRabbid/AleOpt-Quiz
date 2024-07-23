import { useEffect } from 'react';
import { Badge, Spinner } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
} from 'chart.js';

import { useGetUserStatsQuery } from '../../../app/store/api/stats.api';

import { typeApiResponse } from '../../../types/types';

interface iUserStatsProps {
  username: string;
  headers: typeApiResponse;
}

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, Legend);

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
    error,
    isFetching,
    isLoading,
  } = useGetUserStatsQuery({
    headers,
    params: { username },
  });

  useEffect(() => {
    if (!!error) console.log(error);
    if (!!userStats) console.log(userStats);
  }, [userStats, error]);
  console.log(
    'Правильные ответы - ',
    userStats?.attempts.map((item) => item.correctAnswers),
  );
  console.log(
    'Неправленые ответы',
    userStats?.attempts.map(
      (item) => item.answers.length - item.correctAnswers,
    ),
  );
  console.log(
    'макс значение ответы',
    userStats?.attempts.reduce(
      (max, item) => (item.answers.length > max ? item.answers.length : max),
      0,
    ),
  );
  const dataLine = {
    labels: userStats?.attempts.map((item) => item.data),
    datasets: [
      {
        label: 'Правильные ответы',
        data: userStats?.attempts.map((item) => item.correctAnswers),
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Неправленые ответы',
        data: userStats?.attempts.map(
          (item) => item.answers.length - item.correctAnswers,
        ),
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const optionsLine = {
    plugins: {
      title: {
        display: true,
        text: 'asdasdasd',
      },
    },
    scales: {
      y: {
        min: 0,
        max: userStats?.attempts.reduce(
          (max, current) =>
            current.answers.length > max ? current.answers.length : max,
          0,
        ),
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };

  return (
    <section className="w-100 h-100 col-12 col-md-10 h-5em col-xxl-8 col-12 d-flex flex-row flex-wrap align-items-center justify-content-center">
      {!userStats ? (
        <article className="w-100 p-2 card shadow-sm">
          <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
            Ошибка! Данные не загружены
          </p>
        </article>
      ) : (
        <>
          <article className="w-100 m-1 p-2 card shadow-sm">
            <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold d-flex flex-row justify-content-center">
              За последние {userStats.numberAttempts} попыток ваш средний балл
              <Badge
                bg={getBadgeStyle(userStats.averageResult)}
                className="ms-1 p-2"
              >
                {userStats.averageResult}%
              </Badge>
            </p>
          </article>
          <article className="w-100 m-1 p-3 card shadow-sm">
            <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
              Диаграмма
            </p>
            <div className="W-100">
              <Bar data={dataLine} options={optionsLine} />
            </div>
          </article>
        </>
      )}

      {(isFetching || isLoading) && (
        <Spinner animation="border" variant="success">
          <span className="visually-hidden">Получение данных...</span>
        </Spinner>
      )}
    </section>
  );
};

export default UserStats;
