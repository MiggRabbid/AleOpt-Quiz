import React from 'react';
import { Modal } from 'react-bootstrap';

interface iModalDelConfirmProps {
  modalState: boolean;
  onHide: () => void;
  idOrUsername: string;
}

const ModalDelConfirm: React.FC<iModalDelConfirmProps> = (props) => {
  console.group('----- ModalDelConfirm');
  const { modalState, onHide, idOrUsername } = props;

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
        <Modal.Title>Подтвердите удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>{idOrUsername}</Modal.Body>
    </Modal>
  );
};

export default ModalDelConfirm;
