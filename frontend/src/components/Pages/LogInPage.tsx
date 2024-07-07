import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import { getError } from '../../selectors/authSelectors';

import { iUser } from '../../models/interfaces';

import BgLogin from '../../assets/login-img.jpg';
import { useLogInMutation } from '../../store/auth.api';

type refType = HTMLInputElement | null;

axios.create({
  baseURL: '/',
});

axios.defaults.baseURL = 'http://localhost:5000';

const LoginPage = () => {
  console.log('----- Login');
  const navigate = useNavigate();
  const passwordRef = useRef<refType>(null);
  const usernameRef = useRef<refType>(null);
  const [logIn, { data, error }] = useLogInMutation();
  const { user, UseLogin } = useAuth();
  const authError = useSelector(getError);

  useEffect(() => {
    if (user) navigate(routes.MainPagePath());
  });

  useEffect(() => {
    if (data) {
      UseLogin(data as iUser);
      navigate(routes.MainPagePath());
    }
  }, [data, error]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('LoginPage response values - ', values);
        await logIn(values);
        console.log('LoginPage response data   - ', data);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

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
                <img
                  src={BgLogin}
                  alt="Simple Chat"
                  className="rounded"
                  style={{ width: 300 }}
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">Авторизуйтесь</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="usernameInput"
                    label="Имя пользователя"
                  >
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Имя пользователя"
                      autoComplete="username"
                      required
                      ref={usernameRef}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      isInvalid={!!authError}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel controlId="usernamePassword" label="Пароль">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      className="form-control"
                      autoComplete="current-password"
                      required
                      ref={passwordRef}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={!!authError}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid" tooltip>
                    Какая-то ошибка
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 py-2 mb-3"
                >
                  Авторизоваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
