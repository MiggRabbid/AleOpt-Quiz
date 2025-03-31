import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Nav, Tab } from 'react-bootstrap';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import { useGetAllUsersQuery } from '../../app/api/users.api';
import { useGetAllQuestionsQuery } from '../../app/api/quiz.api';

import WatchUsers from './ui/WatchUser/WatchUsers';
import WatchQuestions from './ui/WatchQuestions/WatchQuestions';

import { typeApiResponse } from '../../types/types';

const AdminPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authUser, isAdmin } = useAuth();

  useEffect(() => {
    if (!authUser) {
      navigate(routes.loginPagePath());
    }
    if (!!authUser && !isAdmin(authUser)) {
      navigate(routes.MainPagePath());
    }
  }, [authUser, isAdmin, navigate]);

  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { data: questions } = useGetAllQuestionsQuery(headers);
  const { data: users } = useGetAllUsersQuery(headers);

  const navLinkClass = 'rounded text-center text-md-start';

  return (
    <main
      className="col-12 col-xxl-11 h-100 p-0 m-0 my-2 rounded overflow-hidden bg-danger-subtle"
      style={{ minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)' }}
      id="adminPage"
    >
      <Tab.Container transition id="admin-tabs" defaultActiveKey="users">
        <div className="h-100 w-100 m-0 d-flex flex-column flex-md-row justify-content-center align-items-star align-items-md-stretch bg-success-subtle">
          <div
            className="col-12 col-md-1 py-0 px-2 ps-md-2 pe-md-3 bg-light-subtle border"
            style={{ minWidth: '170px' }}
          >
            <Nav variant="pills" className="h-100 d-flex flex-row flex-md-column py-3">
              <Nav.Item className="col-6 col-md-12">
                <Nav.Link eventKey="users" className={navLinkClass}>
                  {t('adminPage.link.users')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="col-6 col-md-12">
                <Nav.Link eventKey="questions" className={navLinkClass}>
                  {t('adminPage.link.questions')}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="h-100 w-100 ms-0 mt-2 ms-md-2 mt-md-0 p-0 bg-light-subtle">
            <Tab.Content>
              <Tab.Pane transition eventKey="users">
                <WatchUsers users={users} />
              </Tab.Pane>
              <Tab.Pane transition eventKey="questions">
                <WatchQuestions questions={questions} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </main>
  );
};

export default AdminPage;
