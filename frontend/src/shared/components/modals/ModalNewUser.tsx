import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useAuth from '../../../hooks/useAuth';
import useActions from '../../../hooks/useActions';
import {
  useAddNewUserMutation,
  useEditUserMutation,
} from '../../../app/store/api/users.api';

import FormInput from '../forms/InputFabric';
import MainButton from '../buttons/MainButton';

import { typeApiResponse } from '../../../types/types';
import { iUser, UserRoles } from '../../../types/iUser';

interface iModalNewUserProps {
  modalState: boolean;
  onHide: () => void;
  user: iUser | null;
}

interface iInitialValues {
  role: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const getValidationSchema = (user: iUser | null) => {
  const baseSchema = {
    firstName: Yup.string().required('Имя обязательно'),
    lastName: Yup.string().required('Фамилия обязательна'),
    username: Yup.string()
      .min(4, 'Логин должен быть не менее 4 символов')
      .max(20, 'Логин должен быть не более 20 символов')
      .required('Логин обязателен'),
    role: Yup.mixed().required('Роль обязательна'),
  };

  if (!!user) {
    return Yup.object(baseSchema);
  }

  return Yup.object({
    ...baseSchema,
    password: Yup.string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .max(20, 'Пароль должен быть не более 20 символов')
      .required('Пароль обязателен'),
  });
};

const getInitialValues = (user: iUser | null): iInitialValues => {
  console.log(user);
  return !!user
    ? ({ ...user, password: '' } as iInitialValues)
    : {
        role: UserRoles.Employee,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      };
};

const ModalNewUser: React.FC<iModalNewUserProps> = (props) => {
  console.group('----- ModalNewUser');
  const { modalState, onHide, user } = props;

  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setUsers } = useActions();
  const [addNewUser] = useAddNewUserMutation();
  const [editUser] = useEditUserMutation();

  const formik = useFormik({
    initialValues: getInitialValues(user),
    validationSchema: getValidationSchema(user),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        let response;
        if (!!user) {
          response = await editUser({
            headers,
            body: values,
            params: { username: user.username },
          });
        } else {
          response = await addNewUser({ headers, body: values });
        }

        if ('data' in response) {
          console.log('ModalNewUser response.data -', response.data);
          setUsers(response.data);
          onHide();
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (e) {
        console.error(e);
      } finally {
        onHide();
      }

      setSubmitting(false);
    },
  });
  console.log('---- formik', formik.values.role);
  console.groupEnd();
  return (
    <Modal
      show={modalState}
      onHide={onHide}
      dialogClassName="modal-dialog-centered"
      className="col-12 col-lg-8 xl-6"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Создание нового пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex justify-content-center align-items-end flex-column gap-4"
          onSubmit={formik.handleSubmit}
        >
          <Form.Group className="h-auto w-100 py-4 d-flex flex-wrap justify-content-center align-items-center gap-3 border-bottom">
            <FormInput
              controlId="inputFirstName"
              label="Введите имя"
              height="50px"
              as="input"
              name="firstName"
              placeholder="Введите имя"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.firstName}
            />

            <FormInput
              controlId="inputLastName"
              label="Введите фамилию"
              height="50px"
              as="input"
              name="lastName"
              placeholder="Введите фамилию"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.lastName}
            />

            <FormInput
              controlId="inputUserName"
              label="Придумайте логин"
              height="50px"
              as="input"
              name="username"
              placeholder="Придумайте логин"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.username}
            />

            <FormInput
              controlId="inputPassword"
              label={!!user ? 'Пароль скрыт' : 'Придумайте пароль'}
              height="50px"
              as="input"
              type="password"
              name="password"
              placeholder="Придумайте пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
              isDisable={!!user}
            />

            <FormInput
              controlId="roleSelect"
              label="Выберите роль пользователя"
              placeholder={!!user ? `Текущая роль - ${user.role}` : undefined}
              height="55px"
              as="select"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.role}
              options={UserRoles}
            />
          </Form.Group>

          <MainButton text="Создать" type="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNewUser;
