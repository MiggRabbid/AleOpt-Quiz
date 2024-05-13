import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import './App.css'

import routes from './routes';
import useAuth from './hooks/useAuth';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Pages/MainPage'
import Login from './components/Pages/LogInPage'
import QuizPage from './components/Pages/QuizePage/QuizPage'
import AdminPage from './components/Pages/AdminPage'
import NotFound from './components/Pages/404NotFound';

const PrivateUserOutlet = () => {
  console.log('----- PrivateUserOutlet')
  const {user, isAdmin } = useAuth();
  console.log(!!user, user);
  if (!!user) console.log(isAdmin(user));
  return (!!user)
  ? <Outlet />
  : <Navigate to={routes.loginPagePath()} />;
};

const PrivateAdminOutlet = () => {
  const {user, isAdmin } = useAuth();
  console.log('----- PrivateAdminOutlet');
  console.log(!!user, user);
  if (!!user) console.log(isAdmin(user));
  return (!!user && isAdmin(user))
  ? <Outlet />
  : <Navigate to={routes.MainPagePath()} />;
};

function App() {
  console.log('----- App')
  return (
    <BrowserRouter>
    <div className="h-100 min-h-100" id="quiz">
      <div className="h-100 d-flex flex-column justify-content-between">
        <Header />
        <Routes>
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.MainPagePath()} element={<PrivateUserOutlet />}>
              <Route path="" element={<Main />} />
          </Route>
          <Route path={routes.AdminPagePath()} element={<PrivateAdminOutlet />}>
              <Route path="" element={<AdminPage />} />
          </Route>
          <Route path={routes.QuizPagePath()} element={<QuizPage />} />
          <Route path={routes.notFoundPagePath()} element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
