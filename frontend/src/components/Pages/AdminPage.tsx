import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Nav, Row, Tab } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

import WatchUsers from '../templates/AdminPage/WatchUsers';
import WatchQuestions from '../templates/AdminPage/WatchQuestions';

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

  console.groupEnd();
  return (
    <main className="h-100 p-0 rounded overflow-hidden container-xxl">
      <Tab.Container
        transition
        id="left-tabs-example"
        defaultActiveKey="questions"
      >
        <Row className="h-100 w-100 m-0 d-flex flex-row justify-content-between position-relative">
          <Col
            sm={3}
            className="p-0 bg-light"
            style={{ minWidth: '170px', maxWidth: '250px' }}
          >
            <Nav
              variant="pills"
              className="flex-column py-3 position-relative"
              style={{ left: '-12px' }}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="users"
                  className="ps-4 py-3 border border-primary"
                >
                  Пользователи
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="questions"
                  className="ps-4 py-3 border border-primary"
                >
                  Вопросы
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="h-100 w-100 ms-2 p-0 bg-light">
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
