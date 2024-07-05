import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { useDeleteUserMutation } from '../../../store/users.api';
import useAuth from '../../../hooks/useAuth';

import { iQuestion, iUser } from '../../../models/interfaces';
import { typeApiResponse } from '../../../models/types';
import useActions from '../../../hooks/useActions';
import { useDeleteQuestionMutation } from '../../../store/quiz.api';

interface iModalDelConfirmProps {
  modalState: boolean;
  onHide: () => void;
  data: iUser | iQuestion;
}

const ModalDelConfirm: React.FC<iModalDelConfirmProps> = (props) => {
  console.group('----- ModalDelConfirm');

  const { modalState, onHide, data } = props;
  const { getAuthHeader } = useAuth();
  const headers = getAuthHeader() as typeApiResponse;
  const { setUsers, setQuestions } = useActions();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelButton = async () => {
    try {
      if ('username' in data) {
        const response = await deleteUser({ headers, body: data });
        if ('data' in response) setUsers(response.data);
      }
      if ('question' in data) {
        const response = await deleteQuestion({ headers, body: data });
        if ('data' in response) setQuestions(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      onHide();
    }
  };

  console.groupEnd();
  return (
    <Modal
      show={modalState}
      onHide={onHide}
      dialogClassName="modal-dialog-centered"
      className="col-10 col-lg-8 xl-6"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="ps-4 m-auto text-uppercase fs-5 fw-bold">
          Подтвердите удаление{' '}
          {'question' in data ? `вопроса №${data.id}` : `пользователя - ${data.username}`}
        </Modal.Title>
      </Modal.Header>

      {'question' in data && (
        <Modal.Body>
          <p className="my-2 px-3 fs-5 fw-normal">{data.question}</p>
        </Modal.Body>
      )}

      {'username' in data && (
        <Modal.Body>
          <p className="my-2 px-3 fs-5 fw-normal">{`${data.firstName} ${data.lastName}`}</p>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleDelButton}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDelConfirm;
