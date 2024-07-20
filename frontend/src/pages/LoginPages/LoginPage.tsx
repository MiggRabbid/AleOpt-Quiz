import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import routes from '../../app/routes';
import useAuth from '../../hooks/useAuth';
import { useLogInMutation } from '../../app/store/api/auth.api';

import BgLogin from '../../assets/login-img.jpg';
import FormInput from '../../shared/components/forms/InputFabric';

import { iUser } from '../../types/interfaces/iUser';

const validationSchema = Yup.object({
  username: Yup.string().required('Логин обязателен'),
  password: Yup.string().required('Пароль обязателен'),
});

const LoginPage = () => {
  console.log('----- Login');
  const navigate = useNavigate();
  const [logIn, { data, error }] = useLogInMutation();
  const { user, UseLogin } = useAuth();

  useEffect(() => {
    if (user) navigate(routes.MainPagePath());
  });

  useEffect(() => {
    if (error) console.log('auth error -', error);
    if (data) {
      UseLogin(data as iUser);
      navigate(routes.MainPagePath());
    }
  }, [data, error]);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('LoginPage response values - ', values);
        await logIn(values);
      } catch (e) {
        if (e) console.log('auth e -', e);
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
                  <FormInput
                    className="w-100"
                    controlId="inputUserName"
                    label="Введите логин"
                    height="50px"
                    as="input"
                    name="username"
                    placeholder="Введите логин"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.username || !!error}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <FormInput
                    className="w-100"
                    controlId="inputPassword"
                    label="Введите пароль"
                    height="50px"
                    as="input"
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.password || !!error}
                  />
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
