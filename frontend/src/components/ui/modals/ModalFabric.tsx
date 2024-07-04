import { useSelector } from 'react-redux';

import { getModalType, getModalState } from '../../../selectors/modalSelectors';

import ModalNewQuestion from './ModalNewQuestion';
import ModalNewUser from './ModalNewUser';

import { FabricModalType } from '../../../models/interfaces';
import ModalDelConfirm from './ModalDelConfirm';
import useActions from '../../../hooks/useActions';

const ModalFabric = () => {
  console.group('----- ModalFabric');

  const { closedModal } = useActions();
  const modalState = useSelector(getModalState);
  const modalType = useSelector(getModalType);
  const modalData = useSelector(getModalType);

  console.groupEnd();
  switch (modalType) {
    case FabricModalType.NewUser:
      return <ModalNewUser modalState={modalState} onHide={closedModal} />;
    case FabricModalType.newQuestion:
      return (
        <ModalNewQuestion
          modalState={modalState}
          onHide={closedModal}
          questionId={modalData as string}
        />
      );
    case FabricModalType.delConfirm:
      return (
        <ModalDelConfirm
          modalState={modalState}
          onHide={closedModal}
          idOrUsername={modalData as string}
        />
      );
    default:
      return null;
  }
};

export default ModalFabric;
