import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  useAddNewUserMutation,
  useEditUserMutation,
} from '../../../store/users.api';
import useActions from '../../../hooks/useActions';
import useAuth from '../../../hooks/useAuth';

import FormInput from '../forms/FormInput';
import MainButton from '../buttons/MainButton';

import { iUser, UserRoles } from '../../../models/interfaces';
import { typeApiResponse } from '../../../models/types';

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

const validationSchema = Yup.object({
  firstName: Yup.string().required('Имя обязательно'),
  lastName: Yup.string().required('Фамилия обязательна'),
  username: Yup.string()
    .min(4, 'Логин должен быть не менее 4 символов')
    .max(20, 'Логин должен быть не более 20 символов')
    .required('Логин обязателен'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов')
    .required('Пароль обязателен'),
  role: Yup.mixed().required('Роль обязательна'),
});

const getInitialValues = (user: iUser | null): iInitialValues => {
  return !!user
    ? (user as iInitialValues)
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
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log(values);
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
              label="Придумайте пароль"
              height="50px"
              as="input"
              type="password"
              name="password"
              placeholder="подтвердите пароль"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.password}
            />

            <FormInput
              controlId="roleSelect"
              label="Выберите роль пользователя"
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
