import { useNavigate } from 'react-router-dom';

import routes from '../../../app/routes';

import MainButton from '../../../shared/components/buttons/MainButton';

const StartQuiz = () => {
  const navigate = useNavigate();

  return (
    <section className="w-100 col-12 col-md-10 h-5em col-xxl-8 col-12 d-flex flex-row align-items-center justify-content-end">
      <p className="p-0 m-0 text-center text-uppercase fs-5 fw-semibold">
        Хочешь пройти тест снова? Жми кнопку!
      </p>
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
