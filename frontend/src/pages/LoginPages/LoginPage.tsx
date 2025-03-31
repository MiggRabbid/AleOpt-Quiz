import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';

import LoginForm from './ui/LoginForm/LoginForm';
import BgLogin from '../../assets/login-img.jpg';

const LoginPage = () => {
  console.log('----- LoginPage');
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    if (!!authUser) navigate(routes.MainPagePath());
  }, [authUser, navigate]);

  return (
    <div
      className="col-12 col-xxl-11 h-100 mx-0 d-flex align-items-center justify-content-center"
      id="loginPage"
    >
      <div className="h-100 w-100 row justify-content-center align-content-center ">
        <div className="col-12 my-3 col-sm-10 col-md-11 col-lg-9 col-xl-7">
          <div className="w-auto card shadow-sm">
            <div className="card-body row p-3 p-md-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">
                <img src={BgLogin} alt="Simple Chat" className="rounded" style={{ width: 300 }} />
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
