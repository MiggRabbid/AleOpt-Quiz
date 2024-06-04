import { useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { UserRoles } from '../../../models/interfaces';

import EyeWithoutSlash from '../../ui/icons/EyeWithoutSlash';
import EyeWithSlash from '../../ui/icons/EyeWithSlash';
import FormInput from '../../ui/forms/FormInput';

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

const CreateNewUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        console.log('formik onSubmit -', values);
      } catch (e) {
        console.error(e);
      }
      setSubmitting(false);
    },
  });

  return (
    <Form
      className="col-12 col-lg-8 xl-6 m-auto d-flex justify-content-center align-items-center flex-column gap-4 rounded-2 border-2 shadow py-5"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="h-auto d-flex flex-wrap justify-content-center align-items-center gap-3">
        <FormInput
          controlId="inputFirstName"
          label="Введите имя"
          height="50px"
          inputType="input"
          placeholder="Введите имя"
          name="fistName"
          value={formik.values.fistName}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.fistName}
        />

        <FloatingLabel
          className="col-11 col-sm-5"
          controlId="inputLastName"
          label="Введите фамилию"
        >
          <Form.Control
            style={{ height: '50px', minWidth: '150px' }}
            as="input"
            name="lastName"
            placeholder="Введите фамилию"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.lastName}
          />
        </FloatingLabel>

        <FloatingLabel
          className="col-11 col-sm-5"
          controlId="inputUserName"
          label="Придумайте логин"
        >
          <Form.Control
            style={{ height: '50px', minWidth: '150px' }}
            as="input"
            name="username"
            placeholder="Придумайте логин"
            required
            value={formik.values.username}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.username}
          />
        </FloatingLabel>

        <FloatingLabel
          className="col-11 col-sm-5 position-relative"
          controlId="inputPassword"
          label="Придумайте пароль"
        >
          <Form.Control
            style={{ height: '50px', minWidth: '150px' }}
            as="input"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="подтвердите пароль"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password}
          />
          <Button
            size="sm"
            variant="outline-secondary"
            className="position-absolute me-2 translate-middle-y top-50 end-0"
            onClick={handleShowPassword}
          >
            {showPassword ? <EyeWithSlash /> : <EyeWithoutSlash />}
          </Button>
        </FloatingLabel>

        <FloatingLabel
          className="col-11 col-sm-5"
          controlId="roleSelect"
          label="Выберите роль пользователя"
        >
          <Form.Select
            required
            name="role"
            aria-label="Выберите роль пользователя"
            style={{ height: '55px', minWidth: '150px' }}
            onChange={formik.handleChange}
            defaultValue=""
          >
            <option defaultValue={UserRoles.Employee}>Сотрудник</option>
            <option value={UserRoles.Admin}>Администратор</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Button
        type="submit"
        variant="outline-success"
        className="px-2 py-1"
        style={{ height: '50px', width: '200px' }}
      >
        Добавить пользователя
      </Button>
    </Form>
  );
};

export default CreateNewUser;
