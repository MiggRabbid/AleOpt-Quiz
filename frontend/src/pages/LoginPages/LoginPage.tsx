import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import { useLogInMutation } from '../../app/store/api/auth.api';

import LoginForm from './ui/LoginForm/LoginForm';
import BgLogin from '../../assets/login-img.jpg';

import { iUser } from '../../types/iUser';
import { iAuthError } from '../../types/iAuth';

const LoginPage = () => {
  console.log('----- Login');
  const navigate = useNavigate();
  const { user, userLogin } = useAuth();
  const [logIn, { data, error, isError, isLoading }] = useLogInMutation();

  useEffect(() => {
    if (!!user) navigate(routes.MainPagePath());
  }, [user, navigate]);

  useEffect(() => {
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
        <div className="col-12 my-3 col-sm-10 col-md-11 col-lg-9 col-xl-8">
          <div className="card shadow-sm">
            <div className="card-body row p-3 p-md-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={BgLogin} alt="Simple Chat" className="rounded" style={{ width: 300 }} />
              </div>
              <LoginForm
                logIn={logIn}
                error={error as iAuthError}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
