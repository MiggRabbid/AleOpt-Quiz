import * as Yup from 'yup';
import { typeTranslationFunction } from '../../../../../types/types';

const getValidationSchema = (t: typeTranslationFunction) => {
  return Yup.object({
    username: Yup.string()
      .min(4, t('errors.usernameLength'))
      .max(20, t('errors.usernameLength'))
      .required(t('errors.usernameRequired')),
    password: Yup.string()
      .min(6, t('errors.passwordLength'))
      .max(20, t('errors.passwordLength'))
      .required(t('errors.passwordRequired')),
  });
};

export default getValidationSchema;
