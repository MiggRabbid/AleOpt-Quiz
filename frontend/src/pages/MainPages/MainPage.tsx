import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { useGetAllQuestionsQuery } from '../../app/store/api/quiz.api';
import { useGetCurrentUserQuery } from '../../app/store/api/users.api';

import UserStats from '../../entities/users/UserStats/UserStats';
import StartQuizCard from './ui/StartQuizCard';
import CurrUserCard from './ui/CurrUserCard';

import { typeApiResponse } from '../../types/types';
import ContinueQuizCard from './ui/ContinueQuizCard';
import useLocalStorage from '../../hooks/useLocalStorage';

const MainPage = () => {
  const navigate = useNavigate();
  const { setQuestions, setCurrentUser, setCurrentResult } = useActions();

  const { user, isAdmin, getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;

  const unfinishedAttempt = useLocalStorage.getResult();

  const { data: questions } = useGetAllQuestionsQuery(headers);
  const { data: curUser } = useGetCurrentUserQuery({
    headers,
    params: { username: user?.username || '' },
  });

  useEffect(() => {
    if (!!user && isAdmin(user)) navigate(routes.AdminPagePath());
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (!!questions) setQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (!!curUser) setCurrentUser(curUser);
  }, [curUser]);

  useEffect(() => {
    if (!!unfinishedAttempt && unfinishedAttempt.answers.length > 0) {
      setCurrentResult(unfinishedAttempt.answers);
    }
  }, [unfinishedAttempt]);

  return (
    <main
      className="container-xxl h-100 p-0 mx-0 rounded-0 mx-0 my-5 d-flex flex-column align-items-center justify-content-between gap-5"
      style={{ minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)' }}
      id="MainPage"
    >
      <div className="w-100 d-flex flex-row">
        <div className="w-50 d-flex flex-column">
          <CurrUserCard />
        </div>
        <div className="w-50 d-flex flex-column">
          {!!unfinishedAttempt && unfinishedAttempt.answers.length > 0 ? (
            <ContinueQuizCard />
          ) : (
            <StartQuizCard />
          )}
        </div>
      </div>

      {!!user && <UserStats username={user?.username} headers={headers} />}
    </main>
  );
};

export default MainPage;
