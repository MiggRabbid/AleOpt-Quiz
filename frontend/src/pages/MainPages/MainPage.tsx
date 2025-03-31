import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useGetAllQuestionsQuery } from '../../app/api/quiz.api';
import { useGetCurrentUserQuery } from '../../app/api/users.api';

import { typeApiResponse } from '../../types/types';
import WatchStats from './ui/WatchStats/WatchStats';

const MainPage = () => {
  console.log('----- MainPage');
  const navigate = useNavigate();
  const { setQuestions, setCurrentUser, setCurrentResult } = useActions();

  const { authUser, isAdmin, getAuthHeader } = useAuth();

  useEffect(() => {
    if (!!authUser && isAdmin(authUser)) navigate(routes.AdminPagePath());
  }, [authUser, isAdmin, navigate]);

  const headers = getAuthHeader() as typeApiResponse;

  const unfinishedAttempt = useLocalStorage.getResult();

  const { data: questions } = useGetAllQuestionsQuery(headers);
  const { data: curUser } = useGetCurrentUserQuery({
    headers,
    params: { username: authUser?.username || '' },
  });

  useEffect(() => {
    if (!!questions) setQuestions(questions);
  }, [questions, setQuestions]);

  useEffect(() => {
    if (!!curUser) setCurrentUser(curUser);
  }, [curUser, setCurrentUser]);

  useEffect(() => {
    if (!!unfinishedAttempt && unfinishedAttempt.answers.length > 0) {
      setCurrentResult(unfinishedAttempt.answers);
    }
  }, [unfinishedAttempt, setCurrentResult]);

  const navLinkClass = 'rounded text-center text-md-start';

  return (
    <main
      className="col-12 col-xxl-11 h-100 p-0 m-0 my-2 rounded overflow-hidden bg-danger-subtle"
      style={{ minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)' }}
      id="MainPage"
    >
      <Tab.Container transition id="admin-tabs" defaultActiveKey="statistics">
        <div
          className="h-100 w-100 m-0 d-flex flex-column flex-md-row justify-content-center align-items-star align-items-md-stretch bg-success-subtle"
          style={{ minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)' }}
        >
          <div
            className="col-12 col-md-1 py-0 px-2 ps-md-2 pe-md-3 bg-light-subtle border"
            style={{ minWidth: '170px' }}
          >
            <Nav
              variant="pills"
              className="h-100 d-flex flex-row flex-md-column pt-2 pt-md-4 pb-2 pb-md-3"
            >
              <Nav.Item className="col-6 col-md-12">
                <Nav.Link eventKey="statistics" className={navLinkClass}>
                  Статистика
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="col-6 col-md-12">
                <Nav.Link eventKey="lastAttempt" className={navLinkClass}>
                  Последняя попытка
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="h-100 w-100 ms-0 mt-2 ms-md-2 mt-md-0 p-0 bg-light-subtle">
            <Tab.Content>
              <Tab.Pane transition eventKey="statistics">
                <WatchStats
                  unfinishedAttempt={unfinishedAttempt}
                  authUser={authUser}
                  headers={headers}
                />
              </Tab.Pane>
              <Tab.Pane transition eventKey="lastAttempt">
                Тут будет последняя попытка
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </main>
  );
};

export default MainPage;
