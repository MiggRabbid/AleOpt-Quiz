import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getModalType, getModalState, getModalData } from '../../../selectors/modalSelectors';
import useActions from '../../../hooks/useActions';

import ModalUser from './ModalUser';
import ModalQuestion from './ModalQuestion';
import ModalDelConfirm from './ModalDelConfirm';

import { FabricModalType } from '../../../types/iModal';
import { iQuestion } from '../../../types/iQuiz';
import { iUser } from '../../../types/iUser';

const ModalFabric = () => {
  console.group('----- ModalFabric');

  const { closedModal } = useActions();
  const modalState = useSelector(getModalState);
  const modalType = useSelector(getModalType);
  const modalData = useSelector(getModalData);

  const handleCloseButton = () => {
    closedModal();
  };

  useEffect(() => {
    console.log('modalType', modalType);
  }, [modalType]);

  console.groupEnd();
  switch (modalType) {
    case FabricModalType.newUser:
    case FabricModalType.editUser:
      return (
        <ModalUser
          type={modalType}
          modalState={modalState}
          onHide={handleCloseButton}
          user={modalData as iUser | null}
        />
      );
    case FabricModalType.newQuestion:
    case FabricModalType.editQuestion:
      return (
        <ModalQuestion
          type={modalType}
          modalState={modalState}
          onHide={handleCloseButton}
          question={modalData as iQuestion | null}
        />
      );
    case FabricModalType.delConfirm:
      return (
        <ModalDelConfirm
          modalState={modalState}
          onHide={handleCloseButton}
          data={modalData as iUser | iQuestion}
        />
      );
    default:
      return null;
  }
};

export default ModalFabric;
