import React from 'react';
import { useFormik } from 'formik';
import { Form, Modal } from 'react-bootstrap';

import { UserRoles } from '../../../models/interfaces';

import FormInput from '../../ui/forms/FormInput';
import MainButton from '../../ui/MainButton';

interface iCreateNewUserProps {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iInitialValues {
  role: UserRoles;
  fistName: string;
  lastName: string;
  username: string;
  password: string;
}

const initialValues: iInitialValues = {
  role: UserRoles.Employee,
  fistName: '',
  lastName: '',
  username: '',
  password: '',
};

const CreateNewUser: React.FC<iCreateNewUserProps> = (props) => {
  const { modalState, setModalState } = props;
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('formik onSubmit -', values);
        setModalState(!modalState);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  return (
    <Modal
      show={modalState}
      onHide={() => setModalState(!modalState)}
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
              name="fistName"
              placeholder="Введите имя"
              value={formik.values.fistName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.fistName}
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
