import { useNavigate } from 'react-router-dom';

import routes from '../../../app/routes';

import MainButton from '../../../shared/components/buttons/MainButton';

const StartQuiz = () => {
  const navigate = useNavigate();

  return (
    <section className="w-50 col-12 col-md-10 h-5em col-xxl-8 col-12 d-flex flex-row align-items-center justify-content-end">
      <div>
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

export default StartQuiz;
