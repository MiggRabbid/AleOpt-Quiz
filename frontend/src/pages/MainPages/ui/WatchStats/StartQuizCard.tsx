import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../../../app/routes';

import MainButton from '../../../../shared/components/buttons/MainButton';

const StartQuizCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="col-12 h-100 d-flex flex-column align-items-end justify-content-center gap-1">
      <div className="col-12 d-flex flex-column flex-lg-row align-items-center justify-content-end gap-2">
        <p className="w-auto p-0 m-0 text-end text-uppercase fs-6 fs-lg-5 fw-semibold">
          {t('mainPage.startQuiz.title')}
        </p>
        <p className="w-auto p-0 pe-1 m-0 text-end text-uppercase fs-6 fs-lg-5 fw-semibold">
          {t('mainPage.startQuiz.subTitle')}
        </p>
      </div>
      <div>
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
