import { useSelector } from 'react-redux';

import {
  getModalType,
  getModalState,
  getModalData,
} from '../../../selectors/modalSelectors';

import ModalNewQuestion from './ModalNewQuestion';
import ModalNewUser from './ModalNewUser';

import { FabricModalType, iQuestion, iUser } from '../../../models/interfaces';
import ModalDelConfirm from './ModalDelConfirm';
import useActions from '../../../hooks/useActions';

const ModalFabric = () => {
  console.group('----- ModalFabric');

  const { closedModal } = useActions();
  const modalState = useSelector(getModalState);
  const modalType = useSelector(getModalType);
  const modalData = useSelector(getModalData);

  const handleCloseButton = () => {
    closedModal();
  };

  console.groupEnd();
  switch (modalType) {
    case FabricModalType.NewUser:
      return <ModalNewUser modalState={modalState} onHide={handleCloseButton} />;
    case FabricModalType.newQuestion:
      return (
        <ModalNewQuestion
          modalState={modalState}
          onHide={handleCloseButton}
          questionId={modalData as string}
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
