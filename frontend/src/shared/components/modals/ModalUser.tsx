import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import useAuth from '../../../hooks/useAuth';
// import useActions from '../../../hooks/useActions';
import { useAddNewUserMutation, useEditUserMutation } from '../../../app/api/users.api';
import { getUserValidationSchema } from './utils/modalsValidationSchema';
import { getUserInitialValue } from './utils/modalsInitialValue';

import FormInput from '../forms/InputFabric';
import MainButton from '../buttons/MainButton';

import { typeApiResponse } from '../../../types/types';
import { iUser, UserRoles } from '../../../types/iUser';
import { iAuthError } from '../../../types/iAuth';

interface iModalUserProps {
  type: string;
  modalState: boolean;
  onHide: () => void;
  user: iUser | null;
}

const ModalUser: React.FC<iModalUserProps> = (props) => {
  const { type, modalState, onHide, user } = props;

  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  // const { setUsers } = useActions();

  const [addNewUser, { isLoading, isError, error }] = useAddNewUserMutation();
  const [editUser] = useEditUserMutation();

  const [isDisable, setIsDisable] = useState<boolean>(!!user || isLoading);

  const formik = useFormik({
    initialValues: getUserInitialValue(user),
    validationSchema: getUserValidationSchema(t, user),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        // let response;
        console.log(values);
        if (!!user && isDisable) {
          await editUser({
            headers,
            body: values,
            params: { username: user.username },
          });
        } else if (!!user && !isDisable) {
          await editUser({
            headers,
            body: values,
            params: { username: user.username },
          });
        } else {
          await addNewUser({ headers, body: values });
        }

        // if ('data' in response) {
        //   setUsers(response.data);
        //   onHide();
        // } else {
        //   console.error('Unexpected response structure:', response);
        // }
        onHide();
      } catch (e) {
        console.error(e);
      }

      setSubmitting(false);
    },
  });
  // Думаю, что это костыль, а не типизация
  const handleSubmitWrapper = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Modal
      show={modalState}
      onHide={onHide}
      dialogClassName="modal-dialog-centered"
      size="lg"
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title>{t(`shared.modals.${type}.title`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
          className="d-flex justify-content-center align-items-end flex-column gap-4"
        >
          <Form.Group className="h-auto w-100 py-4 d-flex flex-column flex-lg-row flex-wrap justify-content-center align-items-center gap-3">
            <FormInput
              controlId="inputFirstName"
              label={t(`shared.modals.${type}.inputFirstName`)}
              height="50px"
              as="input"
              name="firstName"
              placeholder={t(`shared.modals.${type}.inputFirstName`)}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.firstName || isError}
              error={formik.errors.firstName}
            />
            <FormInput
              controlId="inputLastName"
              label={t(`shared.modals.${type}.inputLastName`)}
              height="50px"
              as="input"
              name="lastName"
              placeholder={t(`shared.modals.${type}.inputLastName`)}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              isDisable={isLoading}
              isInvalid={!!formik.errors.lastName || isError}
              error={formik.errors.lastName}
            />
            <FormInput
              controlId="inputUserName"
              label={t(`shared.modals.${type}.inputUsername`)}
              height="50px"
              as="input"
              name="username"
              placeholder={t(`shared.modals.${type}.inputUsername`)}
              value={formik.values.username}
              onChange={formik.handleChange}
              isDisable={isLoading}
              isInvalid={!!formik.errors.username || isError}
              error={formik.errors.username || t(`errors.${(error as iAuthError)?.data.errorType}`)}
            />
            <FormInput
              controlId="roleSelect"
              label={t(`shared.modals.${type}.selectRole`)}
              placeholder={
                !!user
                  ? `${t(`shared.modals.${type}.currentRole`)}${user.role}`
                  : t(`shared.modals.${type}.currentRole`)
              }
              height="55px"
              as="select"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              options={UserRoles}
              isDisable={isLoading}
              isInvalid={!!formik.errors.role || isError}
              error={formik.errors.role}
            />
            <FormInput
              controlId="inputPassword"
              label={
                !!user
                  ? t(`shared.modals.${type}.inputPasswordHidden`)
                  : t(`shared.modals.${type}.inputPasswordShow`)
              }
              height="50px"
              as="input"
              type="password"
              name="password"
              placeholder={
                !!user
                  ? t(`shared.modals.${type}.inputPasswordHidden`)
                  : t(`shared.modals.${type}.inputPasswordShow`)
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              isDisable={isDisable}
              isInvalid={!!formik.errors.password || isError}
              error={formik.errors.password}
            />
            {!!user && (
              <MainButton
                type="button"
                style={{ height: '55px', weight: '100%' }}
                text={t('shared.modals.editUserModal.changePass')}
                variant="outline-secondary"
                onClick={() => setIsDisable(!isDisable)}
              />
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <MainButton
          onClick={handleSubmitWrapper}
          text={t('shared.modals.btnCreate')}
          type="submit"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUser;
