import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import routes from './routes.ts';
import useAuth from '../hooks/useAuth.ts';
import { getModalState } from '../selectors/modalSelectors.ts';

import Header from '../widgets/Header/Header.tsx';
import Footer from '../widgets/Footer/Footer.tsx';
import MainPage from '../pages/MainPages/MainPage.tsx';
import LoginPage from '../pages/LoginPages/LoginPage.tsx';
import QuizPage from '../pages/QuizPages/QuizPage.tsx';
import AdminPage from '../pages/AdminPages/AdminPage.tsx';
import NotFound from '../pages/404Pages/404NotFound.tsx';
import ModalFabric from '../shared/components/modals/ModalFabric.tsx';

const PrivateUserOutlet = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const PrivateAdminOutlet = () => {
  const { user, isAdmin } = useAuth();

  if (user) console.log(isAdmin(user));

  return !!user && isAdmin(user) ? <Outlet /> : <Navigate to={routes.MainPagePath()} />;
};

const App = () => {
  console.group('----- App');

  const modalState = useSelector(getModalState);

  console.groupEnd();
  return (
    <BrowserRouter>
      <div
        className="container-fluid p-0 min-vh-100 bg-secondary-subtle d-flex flex-column align-items-center justify-content-between"
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
