import { Button, ButtonGroup } from 'react-bootstrap';

import useActions from '../../../hooks/useActions';

import TrashBucket from '../icons/TrashBucket';
import PencilSquare from '../icons/PencilSquare';

import { FabricModalType, iQuestion, iUser } from '../../../models/interfaces';

interface iChangeButtonsGroupProps {
  data: iUser | iQuestion;
}

const ChangeButtonsGroup: React.FC<iChangeButtonsGroupProps> = (props) => {
  const { data } = props;
  const { openModal } = useActions();

  return (
    <ButtonGroup vertical size="sm" className="mb-2">
      <Button
        variant="primary"
        onClick={() =>
          openModal({
            modalType: FabricModalType.NewUser,
            modalData: data,
          })
        }
      >
        <PencilSquare />
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          openModal({
            modalType: FabricModalType.delConfirm,
            modalData: data,
          })
        }
      >
        <TrashBucket />
      </Button>
    </ButtonGroup>
  );
};

export default ChangeButtonsGroup;
