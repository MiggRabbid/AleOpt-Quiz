import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../../app/routes';
import useActions from '../../../hooks/useActions';

import MainButton from '../../../shared/components/buttons/MainButton';
import useLocalStorage from '../../../hooks/useLocalStorage';

const ContinueQuizCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { clearCurrentResult } = useActions();

  return (
    <section className="w-100 h-100 d-flex flex-column align-items-end justify-content-center gap-3">
      <div className="col-12 d-flex flex-column align-items-end justify-content-center gap-2">
        <p className="col-12 p-0 m-0 text-end text-uppercase fs-6 fs-lg-5 fw-semibold">
          {t('mainPage.contQuiz.title')}
        </p>
        <p className="col-12 p-0 pe-1 m-0 text-end text-uppercase fs-6 fs-lg-5 fw-semibold">
          {t('mainPage.contQuiz.subTitle')}
        </p>
      </div>
      <div className="d-flex flex-column flex-sm-row flex-row mx-0 mx-lg-3 gap-3">
        <MainButton
          text={t('mainPage.contQuiz.btnCont')}
          type="button"
          variant="outline-success"
          onClick={() => navigate(routes.QuizPagePath())}
        />
        <MainButton
          text={t('mainPage.contQuiz.btnReset')}
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
