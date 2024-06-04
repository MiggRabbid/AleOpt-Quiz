import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import useAuth from '../../hooks/useAuth';
import routes from '../../routes';
import CreateNewQuestion from '../templates/AdminPage/CreateNewQuestion';
import CreateNewUser from '../templates/AdminPage/CreateNewUser';

const AdminPage = () => {
  console.log('----- AdminPage');
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('users');

  useEffect(() => {
    if (!user || (!!user && !isAdmin(user))) navigate(routes.loginPagePath());
  }, [user, isAdmin]);

  return (
    <main className="container-xxl h-100 p-0 w-100 mt-4">
      <Tabs
        id="admin-tabs"
        activeKey={activeTab}
        className="mb-3"
        onSelect={(tab) => {
          console.log(tab);
          setActiveTab(tab as string);
        }}
        fill
      >
        <Tab eventKey="users" title="Пользователи" className="mt-5">
          <h5> Пользователи </h5>
        </Tab>

        <Tab eventKey="newQuestion" title="Создать вопрос" className="mt-5">
          <CreateNewQuestion />
        </Tab>

        <Tab eventKey="newUsers" title="Создать пользователя" className="mt-5">
          <CreateNewUser />
        </Tab>
      </Tabs>
    </main>
  );
};

export default AdminPage;
