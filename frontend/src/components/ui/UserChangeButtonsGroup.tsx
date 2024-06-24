import { Button, ButtonGroup } from 'react-bootstrap';
import TrashBucket from './icons/TrashBucket';
import PencilSquare from './icons/PencilSquare';

const UserChangeButtonsGroup = () => {
  return (
    <ButtonGroup vertical size="sm" className="mb-2">
      <Button variant="primary">
        <PencilSquare />
      </Button>
      <Button variant="danger">
        <TrashBucket />
      </Button>
    </ButtonGroup>
  );
};

export default UserChangeButtonsGroup;
