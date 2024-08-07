import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { getCurrentResult, getQuestionIndex, getQuestions } from '../../selectors/quizSelectors';

import QuestionsFinished from './ui/QuizFinished';
import QuestionsSection from './ui/QuizStepSection';

import { iQuestion } from '../../types/iQuiz';
import useLocalStorage from '../../hooks/useLocalStorage';

const QuizPage = () => {
  console.group('----- QuizPage');
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { changeQuizState } = useActions();

  const questionsIndex = useSelector(getQuestionIndex);
  const questions = useSelector(getQuestions) as iQuestion[];
  const currentResult = useSelector(getCurrentResult);
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (currentResult.length > 0) useLocalStorage.setResult(currentResult);
  }, [currentResult]);

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath());
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user, quantityQuestions]);

  useEffect(() => {
    changeQuizState(true);
  }, []);

  console.groupEnd();
  return (
    <main
      className="container-xxl h-100 my-4 mx-0 p-0 d-flex align-items-center justify-content-center"
      style={{ minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)' }}
      id="quizPage"
    >
      <div className="h-100 w-100 p-0 d-flex justify-content-center align-content-center ">
        {questionsIndex < quantityQuestions ? (
          <QuestionsSection questions={questions} quantityQuestions={quantityQuestions} />
        ) : (
          <QuestionsFinished />
        )}
      </div>
    </main>
  );
};

export default QuizPage;
