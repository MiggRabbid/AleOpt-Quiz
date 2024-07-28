import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import { useLogInMutation } from '../../app/store/api/auth.api';

import LoginForm from './ui/LoginForm';
import BgLogin from '../../assets/login-img.jpg';

import { iUser } from '../../types/iUser';

const LoginPage = () => {
  console.log('----- Login');
  const navigate = useNavigate();
  const { user, userLogin } = useAuth();
  const [logIn, { data, error }] = useLogInMutation();

  useEffect(() => {
    if (!!user) navigate(routes.MainPagePath());
  }, [user, navigate]);

  useEffect(() => {
    if (error) console.log('auth error -', error);
    if (data) {
      userLogin(data as iUser);
      navigate(routes.MainPagePath());
    }
  }, [data, error, userLogin, navigate]);

  return (
    <div
      className="container-xxl h-100 mx-0 d-flex align-items-center justify-content-center"
      id="loginPage"
    >
      <div className="h-100 w-100 row justify-content-center align-content-center ">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={BgLogin} alt="Simple Chat" className="rounded" style={{ width: 300 }} />
              </div>
              <LoginForm logIn={logIn} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
