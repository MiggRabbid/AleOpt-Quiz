import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Nav, Row, Tab } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

import WatchUsers from '../templates/AdminPage/WatchUsers';
import WatchQuestions from '../templates/AdminPage/WatchQuestions';
import { typeApiResponse } from '../../models/types';
import useActions from '../../hooks/useActions';
import { useGetAllQuestionsQuery } from '../../store/quiz.api';
import { useGetAllUsersQuery } from '../../store/users.api';

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
    if (questions) setQuestions(questions);
  }, [questions]);

  useEffect(() => {
    if (users) setUsers(users);
  }, [users]);

  console.groupEnd();
  const navLinkClass = 'ps-4 py-2 border border-2 border-primary';

  return (
    <main className="container-xxl h-100 p-0 rounded" id="admin-page">
      <Tab.Container transition id="left-tabs-example" defaultActiveKey="users">
        <Row className="h-100 w-100 m-0 d-flex flex-row justify-content-between position-relative">
          <Col
            sm={3}
            className="p-0 bg-light rounded-start"
            style={{ minWidth: '170px', maxWidth: '250px' }}
          >
            <Nav variant="pills" className="flex-column p-3">
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
          <Col className="w-100 ms-2 p-0 bg-light rounded-end h-100 overflow-y-auto">
            <Tab.Content>
              <Tab.Pane transition eventKey="users" className="">
                <WatchUsers />
              </Tab.Pane>
              <Tab.Pane transition eventKey="questions">
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
