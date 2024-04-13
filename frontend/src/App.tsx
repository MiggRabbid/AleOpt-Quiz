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
import QuizPage from './components/Pages/QuizPage'
import AdminPage from './components/Pages/AdminPage'

const PrivateOutlet = () => {
  const authentication = useAuth();
  return authentication && authentication.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

function App() {
  console.log('----- App')
  return (
    <BrowserRouter>
    <div className="h-100" id="quiz">
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.MainPagePath()} element={<PrivateOutlet />}>
              <Route path="" element={<Main />} />
          </Route>
          <Route path={routes.QuizPagePath()} element={<QuizPage />} />
          <Route path={routes.AdminPagePath()} element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
