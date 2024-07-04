import { Button, ButtonGroup } from 'react-bootstrap';

import useActions from '../../../../hooks/useActions';

import TrashBucket from '../../icons/TrashBucket';
import PencilSquare from '../../icons/PencilSquare';

import { FabricModalType } from '../../../../models/interfaces';

const ChangeButtonsGroup = () => {
  const { openModal } = useActions();

  return (
    <ButtonGroup vertical size="sm" className="mb-2">
      <Button
        variant="primary"
        onClick={() => openModal({ modalType: FabricModalType.NewUser })}
      >
        <PencilSquare />
      </Button>
      <Button
        variant="danger"
        onClick={() => openModal({ modalType: FabricModalType.delConfirm })}
      >
        <TrashBucket />
      </Button>
    </ButtonGroup>
  );
};

export default ChangeButtonsGroup;
