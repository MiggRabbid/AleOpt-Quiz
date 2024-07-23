import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { useGetAllQuestionsQuery } from '../../app/store/api/quiz.api';

import UserStats from './ui/UserStats';
import StartQuiz from './ui/StartQuiz';

import { typeApiResponse } from '../../types/types';

const MainPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, getAuthHeader } = useAuth();
  const { setQuestions } = useActions();
  const headers = getAuthHeader() as typeApiResponse;
  const { data: questions, error } = useGetAllQuestionsQuery(headers);

  useEffect(() => {
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user, isAdmin]);

  useEffect(() => {
    if (questions) setQuestions(questions);
  }, [headers]);

  useEffect(() => {
    console.group('----- MainPage useEffect');
    if (questions) setQuestions(questions);
    console.log('questions -', questions);
    console.log('error -', error);
    console.groupEnd();
  }, [questions, error]);

  return (
    <main
      className="container-xxl h-100 p-0 mx-0 rounded-0 mx-0 d-flex flex-column align-items-center justify-content-between"
      style={{ minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)' }}
      id="Page"
    >
      <h3 className="text-uppercase py-3 top-0 fw-semibold">{`${user?.username}, Добро пожаловать`}</h3>
      {!!user && <UserStats username={user?.username} headers={headers} />}
      <StartQuiz />
    </main>
  );
};

export default MainPage;
