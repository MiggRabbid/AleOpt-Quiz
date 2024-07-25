import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import useActions from '../../hooks/useActions';
import { useGetAllUsersQuery } from '../../app/store/api/users.api';
import { useGetAllQuestionsQuery } from '../../app/store/api/quiz.api';

import WatchUsers from './ui/WatchUsers';
import WatchQuestions from './ui/WatchQuestions';

import { typeApiResponse } from '../../types/types';

const AdminPage = () => {
  console.group('----- AdminPage');
  const navigate = useNavigate();
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
    console.log('--- questions -', questions);
    if (questions) setQuestions(questions);
  }, [questions]);

  useEffect(() => {
    console.log('--- users     -', users);
    if (users) setUsers(users);
  }, [users]);

  console.groupEnd();
  const navLinkClass = 'ps-4 py-2 rounded-0 rounded-end bg-';

  return (
    <main
      className="container-xxl h-100 p-0 mx-0 rounded-0"
      style={{ minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)' }}
      id="adminPage"
    >
      <Tab.Container transition id="left-tabs-example" defaultActiveKey="users">
        <Row className="h-100 m-0 d-flex flex-row justify-content-between position-relative">
          <Col
            sm={3}
            className="h-auto p-0 bg-light rounded-start"
            style={{
              minWidth: '150px',
              maxWidth: '200px',
              minHeight: 'calc(100vh - 96px - 8px - 8px - 66px)',
            }}
          >
            <Nav variant="pills" className="h-100 flex-column pe-3 py-3">
              <Nav.Item>
                <Nav.Link eventKey="users" className={navLinkClass}>
                  Пользователи
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="questions" className={navLinkClass}>
                  Вопросы
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="h-100 ms-2 p-0 bg-light rounded-end">
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
