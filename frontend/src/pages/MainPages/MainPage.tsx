import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { useGetAllQuestionsQuery } from '../../app/store/api/quiz.api';

import UserStats from '../../entities/users/UserStats/UserStats';
import StartQuiz from './ui/StartQuiz';

import { typeApiResponse } from '../../types/types';

const MainPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, getAuthHeader } = useAuth();
  const { setQuestions } = useActions();
  const headers = getAuthHeader() as typeApiResponse;
  const { data: questions } = useGetAllQuestionsQuery(headers);

  useEffect(() => {
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user, isAdmin]);

  useEffect(() => {
    if (questions) setQuestions(questions);
  }, [headers]);

  return (
    <main
      className="container-xxl h-100 p-0 mx-0 rounded-0 mx-0 my-3 d-flex flex-column align-items-center justify-content-between"
      style={{ minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)' }}
      id="Page"
    >
      <div className="w-100 mb-3 d-flex flex-row">
        <h3 className="w-50 text-uppercase text-center py-3 top-0 fw-semibold">{`${user?.username}, Добро пожаловать`}</h3>
        <StartQuiz />
      </div>
      {!!user && <UserStats username={user?.username} headers={headers} />}
    </main>
  );
};

export default MainPage;
