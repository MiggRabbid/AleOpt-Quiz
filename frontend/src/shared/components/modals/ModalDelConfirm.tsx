import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Modal } from 'react-bootstrap';

import useAuth from '../../../hooks/useAuth';
import useActions from '../../../hooks/useActions';
import { useDeleteUserMutation } from '../../../app/store/api/users.api';
import { useDeleteQuestionMutation } from '../../../app/store/api/quiz.api';

import MainButton from '../buttons/MainButton';

import { iQuestion } from '../../../types/iQuiz';
import { iUser } from '../../../types/iUser';
import { typeApiResponse } from '../../../types/types';

interface iModalDelConfirmProps {
  modalState: boolean;
  onHide: () => void;
  data: iUser | iQuestion;
}

const ModalDelConfirm: React.FC<iModalDelConfirmProps> = React.memo((props) => {
  const { modalState, onHide, data } = props;
  const { getAuthHeader } = useAuth();
  const { t } = useTranslation();
  const headers = getAuthHeader() as typeApiResponse;
  const { setUsers, setQuestions } = useActions();

  const [deleteUser] = useDeleteUserMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleDelButton = useCallback(async () => {
    try {
      let response;
      if ('username' in data) {
        response = await deleteUser({
          headers,
          body: data,
          params: { username: data.username },
        });
        if ('data' in response) setUsers(response.data);
      }
      if ('question' in data) {
        response = await deleteQuestion({
          headers,
          body: data,
          params: { id: data.id },
        });
        if ('data' in response) setQuestions(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      onHide();
    }
  }, [data, deleteUser, deleteQuestion, headers, onHide, setUsers, setQuestions]);

  const renderUserData = (user: iUser) => (
    <Modal.Body className="w-100 my-3 d-flex flex-row justify-content-center gap-2">
      <InputGroup className="w-50">
        <InputGroup.Text id="firstName">Имя:</InputGroup.Text>
        <Form.Control
          value={user.firstName}
          placeholder={user.firstName}
          aria-label="firstName"
          aria-describedby="firstName"
          disabled
        />
      </InputGroup>
      <InputGroup className="w-50">
        <InputGroup.Text id="lastName">Фамилия:</InputGroup.Text>
        <Form.Control
          value={user.lastName}
          placeholder={user.lastName}
          aria-label="lastName"
          aria-describedby="lastName"
          disabled
        />
      </InputGroup>
    </Modal.Body>
  );

  const renderQuestionData = (question: iQuestion) => (
    <Modal.Body className="w-100 my-3 d-flex flex-row justify-content-center gap-2">
      <InputGroup className="w-100 my-2 mx-3">
        <InputGroup.Text id="question" className="">
          Вопрос:
        </InputGroup.Text>
        <Form.Control
          value={question.question}
          placeholder={question.question}
          aria-label="question"
          aria-describedby="question"
          disabled
          className="h-auto"
          as="textarea"
          style={{ minHeight: '150px' }}
        />
      </InputGroup>
    </Modal.Body>
  );

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
          {t('shared.modals.confirmDel')}
          {'question' in data
            ? `${t('shared.modals.questionDel')}${data.id}`
            : `${t('shared.modals.userDel')}${data.username}`}
        </Modal.Title>
      </Modal.Header>

      {'question' in data ? renderQuestionData(data) : renderUserData(data)}

      <Modal.Footer>
        <MainButton
          variant="outline-primary"
          text={t('shared.modals.btnCancel')}
          type="button"
          onClick={onHide}
        />
        <MainButton
          variant="outline-danger"
          text={t('shared.modals.btnDelete')}
          type="button"
          onClick={handleDelButton}
        />
      </Modal.Footer>
    </Modal>
  );
});

ModalDelConfirm.displayName = 'ModalDelConfirm';

export default ModalDelConfirm;
