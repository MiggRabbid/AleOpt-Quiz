import React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../../app/routes';
import useActions from '../../../hooks/useActions';

import MainButton from '../../../shared/components/buttons/MainButton';
import useLocalStorage from '../../../hooks/useLocalStorage';

const ContinueQuizCard = () => {
  const navigate = useNavigate();
  const { clearCurrentResult } = useActions();

  return (
    <section className="w-100 h-100 px-0 col-12 col-md-10 col-xxl-8 col-12 d-flex flex-column align-items-end justify-content-center gap-3">
      <div className="d-flex flex-row align-items-center justify-content-end gap-2">
        <p className="p-0 m-0 text-end text-uppercase fs-5 fw-semibold">
          Есть незаконченный тест!
        </p>
        <p className="p-0 pe-1 m-0 text-end text-uppercase fs-5 fw-semibold">
          Хочешь продолжить?
        </p>
      </div>
      <div className="d-flex mx-3 gap-3">
        <MainButton
          text="Да, погнали!"
          type="button"
          variant="success"
          onClick={() => navigate(routes.QuizPagePath())}
        />
        <MainButton
          text="Нет, хочу с начала!"
          type="button"
          variant="success"
          onClick={() => {
            useLocalStorage.delResult();
            clearCurrentResult();
            navigate(routes.QuizPagePath());
          }}
        />
      </div>
    </section>
  );
};

export default React.memo(ContinueQuizCard);
