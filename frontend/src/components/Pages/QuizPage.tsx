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
  console.group('----- QuizPage');
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { changeQuizState } = useActions();

  const questionsIndex = useSelector(getQuestionIndex);
  const questions = useSelector(getQuestions) as iQuestion[];
  console.log('QuizPage data -', questions);
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath());
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user]);

  useEffect(() => {
    changeQuizState(true);
  }, []);

  console.groupEnd();
  return (
    <main className="container-xxl p-0 h-auto min-h-100 d-flex" id="quiz-page">
      <div className="h-100 p-0 justify-content-center align-content-center ">
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
