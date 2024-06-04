import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { iQuestion } from '../../models/interfaces';

import { getQuestionIndex, getQuestions } from '../../selectors/quizSelectors';
import useActions from '../../hooks/useActions';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

import QuestionsFinished from '../templates/QuizPage/QuestionsFinished';
import QuestionsSection from '../templates/QuizPage/QuestionsSection';

const QuizPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { changeQuizState } = useActions();

  const questionsIndex = useSelector(getQuestionIndex);
  const questions = useSelector(getQuestions) as iQuestion[];
  console.log('MainPage data -', questions);
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath());
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user]);

  useEffect(() => {
    changeQuizState(true);
  }, []);

  return (
    <main className="container-xl h-auto min-h-100 d-flex">
      <div className="h-100 col-12 row justify-content-center align-content-center ">
        {questionsIndex < quantityQuestions ? (
          <QuestionsSection
            questions={questions}
            quantityQuestions={quantityQuestions}
          />
        ) : (
          <QuestionsFinished />
        )}
      </div>
    </main>
  );
};

export default QuizPage;
