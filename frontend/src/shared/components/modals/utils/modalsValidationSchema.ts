import * as Yup from 'yup';

import { iUser } from '../../../../types/iUser';
import { typeTranslationFunction } from '../../../../types/types';

export const getUserValidationSchema = (t: typeTranslationFunction, user: iUser | null) => {
  const baseSchema = {
    firstName: Yup.string().required(t('errors.firstNameRequired')),
    lastName: Yup.string().required(t('errors.lastNameRequired')),
    username: Yup.string()
      .min(4, t('errors.usernameLength'))
      .max(20, t('errors.usernameLength'))
      .required(t('errors.usernameRequired')),
    role: Yup.mixed().required(t('errors.roleRequired')),
  };

  if (!!user) {
    return Yup.object(baseSchema);
  }

  return Yup.object({
    ...baseSchema,
    password: Yup.string()
      .min(6, t('errors.passwordLength'))
      .max(20, t('errors.passwordLength'))
      .required(t('errors.passwordRequired')),
  });
};

export const getQuestionValidationSchema = (t: typeTranslationFunction) => {
  return Yup.object({
    question: Yup.string().required(t('errors.questionRequired')),
    correctAnswerId: Yup.string().required(t('errors.correctAnswerRequired')),
    answers: Yup.object({
      a: Yup.string().required(t('errors.currentAnswerRequired')),
      b: Yup.string().required(t('errors.currentAnswerRequired')),
      c: Yup.string().required(t('errors.currentAnswerRequired')),
      d: Yup.string().required(t('errors.currentAnswerRequired')),
    }),
  });
};
