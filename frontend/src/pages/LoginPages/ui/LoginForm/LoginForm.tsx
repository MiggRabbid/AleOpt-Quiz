import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { useLogInMutation } from '../../../../app/api/auth.api';
import getValidationSchema from './utils/validationSchema';
import useAuth from '../../../../hooks/useAuth';
import routes from '../../../../app/routes';

import FormInput from '../../../../shared/components/forms/InputFabric';
import MainButton from '../../../../shared/components/buttons/MainButton';

import { iUser } from '../../../../types/iUser';
import { iAuthError } from '../../../../types/iAuth';

const LoginForm = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const [logIn, { error, isError, isLoading }] = useLogInMutation();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: getValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await logIn(values);
        if ('data' in response) {
          userLogin(response.data as iUser);
          navigate(routes.MainPagePath());
        }
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="mb-4 text-center fw-bold fs-3 fs-lg-2">{t('loginPage.title')}</h1>
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
          isInvalid={!!formik.errors.username || !!isError}
          error={formik.errors.username}
          isDisable={isLoading}
        />
      </Form.Group>

      <Form.Group className="mb-4">
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
          isInvalid={!!formik.errors.password || !!isError}
          error={formik.errors.password || t(`errors.${(error as iAuthError)?.data.errorType}`)}
          isDisable={isLoading}
        />
      </Form.Group>

      <MainButton
        text={t('loginPage.btn')}
        type="submit"
        variant="success"
        style={{ height: '58px', width: '100%' }}
        disabled={isLoading}
      />
    </Form>
  );
};

export default LoginForm;
