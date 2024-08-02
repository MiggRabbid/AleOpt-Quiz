import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../../app/routes';

import MainButton from '../../../shared/components/buttons/MainButton';

const StartQuizCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="w-100 h-100 d-flex flex-column align-items-end justify-content-center gap-3">
      <div className="d-flex flex-column flex-md-row  flex-lg-column align-items-end align-items-md-center align-items-lg-end justify-content-center gap-2">
        <p className="w-auto p-0 m-0 text-end text-uppercase fs-5 fw-semibold">
          {t('mainPage.startQuiz.title')}
        </p>
        <p className="w-auto p-0 pe-1 m-0 text-end text-uppercase fs-5 fw-semibold">
          {t('mainPage.startQuiz.subTitle')}
        </p>
      </div>
      <div className="mx-0 mx-lg-3">
        <MainButton
          text={t('mainPage.startQuiz.btn')}
          type="button"
          variant="success"
          onClick={() => navigate(routes.QuizPagePath())}
        />
      </div>
    </section>
  );
};

export default React.memo(StartQuizCard);
