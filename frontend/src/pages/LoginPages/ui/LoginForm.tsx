import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import FormInput from '../../../shared/components/forms/InputFabric';

interface iLoginFormProps {
  logIn: (values: { username: string; password: string }) => void;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

const validationSchema = Yup.object({
  username: Yup.string().required('Логин обязателен'),
  password: Yup.string().required('Пароль обязателен'),
});

const LoginForm: React.FC<iLoginFormProps> = (props) => {
  const { logIn, error } = props;
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
  );
};

export default LoginForm;
