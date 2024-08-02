import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { useGetAllUsersQuery } from '../../app/store/api/users.api';
import { useGetAllQuestionsQuery } from '../../app/store/api/quiz.api';

import WatchUsers from './ui/WatchUser/WatchUsers';
import WatchQuestions from './ui/WatchQuestions/WatchQuestions';

import { typeApiResponse } from '../../types/types';

const AdminPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate(routes.loginPagePath());
    }
    if (!!user && !isAdmin(user)) {
      navigate(routes.MainPagePath());
    }
  }, [user, isAdmin, navigate]);

  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setQuestions, setUsers } = useActions();

  const { data: questions } = useGetAllQuestionsQuery(headers);
  const { data: users } = useGetAllUsersQuery(headers);

  useEffect(() => {
    if (!!questions) setQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (users) setUsers(users);
  }, [users]);

  const navLinkClass = 'ps-4 py-2 rounded-0 rounded-end bg-';

  return (
    <main
      className="container-xxl my-2 h-100 p-0 mx-0 rounded-0"
      style={{ minHeight: 'calc(100vh - 82px - 8px - 8px - 64px)' }}
      id="adminPage"
    >
      <Tab.Container transition id="admin-tabs" defaultActiveKey="users">
        <Row className="h-100 m-0 d-flex flex-column flex-md-row justify-content-start align-items-start align-items-md-stretch position-relative">
          <Col className="h-100 col-12 col-md-3 p-0 bg-light rounded">
            <Nav variant="pills" className="h-100 flex-column pe-3 py-3">
              <Nav.Item>
                <Nav.Link eventKey="users" className={navLinkClass}>
                  {t('adminPage.link.users')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questions" className={navLinkClass}>
                  {t('adminPage.link.questions')}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="h-100 w-100 ms-0 mt-2 ms-md-2 mt-md-0 p-0 bg-light rounded">
            <Tab.Content className="h-100">
              <Tab.Pane transition eventKey="users" className="h-100">
                <WatchUsers />
              </Tab.Pane>
              <Tab.Pane transition eventKey="questions" className="h-100">
                <WatchQuestions />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </main>
  );
};

export default AdminPage;
