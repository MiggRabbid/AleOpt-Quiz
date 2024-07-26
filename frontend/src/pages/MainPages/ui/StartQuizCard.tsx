import React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../../app/routes';

import MainButton from '../../../shared/components/buttons/MainButton';

const StartQuizCard = () => {
  const navigate = useNavigate();

  return (
    <section className="w-100 h-100 px-0 col-12 col-md-10 col-xxl-8 col-12 d-flex flex-column align-items-end justify-content-center gap-3">
      <div className="d-flex flex-row align-items-center justify-content-end gap-2">
        <p className="p-0 m-0 text-end text-uppercase fs-5 fw-semibold">
          Хочешь пройти тест снова?
        </p>
        <p className="p-0 pe-1 m-0 text-end text-uppercase fs-5 fw-semibold">
          Жми кнопку!
        </p>
      </div>
      <div className="position-relative mx-3 ">
        <MainButton
          text="Охх, ну понеслось..."
          type="button"
          variant="success"
          onClick={() => navigate(routes.QuizPagePath())}
        />
      </div>
    </section>
  );
};

export default React.memo(StartQuizCard);
