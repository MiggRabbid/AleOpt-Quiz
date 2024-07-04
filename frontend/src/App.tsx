import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import routes from './routes';
import useAuth from './hooks/useAuth';
import { getModalState } from './selectors/modalSelectors.ts';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './components/Pages/MainPage';
import LoginPage from './components/Pages/LogInPage';
import QuizPage from './components/Pages/QuizPage';
import AdminPage from './components/Pages/AdminPage';
import NotFound from './components/Pages/404NotFound';
import ModalFabric from './components/ui/modals/ModalFabric';

const PrivateUserOutlet = () => {
  console.group('----- PrivateUserOutlet');

  const { user, isAdmin } = useAuth();
  console.log(!!user, user);

  if (user) console.log(isAdmin(user));

  console.groupEnd();
  return user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const PrivateAdminOutlet = () => {
  console.group('----- PrivateAdminOutlet');

  const { user, isAdmin } = useAuth();
  console.log(!!user, user);

  if (user) console.log(isAdmin(user));

  console.groupEnd();
  return !!user && isAdmin(user) ? (
    <Outlet />
  ) : (
    <Navigate to={routes.MainPagePath()} />
  );
};

const App = () => {
  console.group('----- initApp');

  const modalState = useSelector(getModalState);

  console.groupEnd();
  return (
    <BrowserRouter>
      <div
        className="container-fluid min-vh-100 bg-secondary-subtle d-flex flex-column align-items-center justify-content-between"
        id="quiz"
      >
        <Header />
        <Routes>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.AdminPagePath()} element={<PrivateAdminOutlet />}>
            <Route path="" element={<AdminPage />} />
          </Route>
          <Route path={routes.MainPagePath()} element={<PrivateUserOutlet />}>
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path={routes.QuizPagePath()} element={<QuizPage />} />
          <Route path={routes.notFoundPagePath()} element={<NotFound />} />
        </Routes>

        {modalState && <ModalFabric />}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
