import React from 'react';
import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';

import { useAddNewUserMutation } from '../../../store/users.api';
import useActions from '../../../hooks/useActions';
import useAuth from '../../../hooks/useAuth';

import FormInput from '../../ui/forms/FormInput';
import MainButton from '../../ui/MainButton';

import { UserRoles } from '../../../models/interfaces';
import { typeApiResponse } from '../../../models/types';

interface iCreateNewUserProps {
  modalState: boolean;
  setModalState: () => void;
}

interface iInitialValues {
  role: UserRoles;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const initialValues: iInitialValues = {
  role: UserRoles.Employee,
  firstName: '',
  lastName: '',
  username: '',
  password: '',
};

const CreateNewUser: React.FC<iCreateNewUserProps> = (props) => {
  console.group('----- CreateNewUser');
  const { modalState, setModalState } = props;

  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setUsers } = useActions();
  const [addNewUser] = useAddNewUserMutation();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await addNewUser({ headers, body: values });
        setUsers(response.data);
        setModalState();
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  console.groupEnd();
  return (
    <Modal
      show={modalState}
      onHide={() => setModalState()}
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

export default CreateNewUser;
