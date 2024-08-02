import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import FormInput from '../../../../shared/components/forms/InputFabric';
import MainButton from '../../../../shared/components/buttons/MainButton';

import { iAuthError } from '../../../../types/iAuth';
import getValidationSchema from './utils/validationSchema';

interface iLoginFormProps {
  logIn: (values: { username: string; password: string }) => void;
  error: iAuthError;
  isError: boolean;
  isLoading: boolean;
}

const LoginForm: React.FC<iLoginFormProps> = (props) => {
  const { logIn, error, isError, isLoading } = props;

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: getValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
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
          error={formik.errors.password || t(`errors.${error?.data.errorType}`)}
          isDisable={isLoading}
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
