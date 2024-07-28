import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import FormInput from '../../../shared/components/forms/InputFabric';
import MainButton from '../../../shared/components/buttons/MainButton';

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

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('LoginPage response values - ', values);
        await logIn(values);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
      <Form.Group className="mb-3">
        <FormInput
          className="w-100"
          controlId="inputUserName"
          label={t('loginPage.inputs.username')}
          height="50px"
          as="input"
          name="username"
          placeholder={t('loginPage.inputs.username')}
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.username || !!error}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <FormInput
          className="w-100"
          controlId="inputPassword"
          label={t('loginPage.inputs.password')}
          height="50px"
          as="input"
          type="password"
          name="password"
          placeholder={t('loginPage.inputs.password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.password || !!error}
        />
      </Form.Group>

      <MainButton
        text={t('loginPage.title')}
        type="submit"
        variant="outline-success"
        style={{ height: '58px', width: '100%' }}
      />
    </Form>
  );
};

export default LoginForm;
