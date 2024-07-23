import React, { useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

import useActions from '../../../hooks/useActions';

import TrashBucket from '../icons/TrashBucket';
import PencilSquare from '../icons/PencilSquare';

import { FabricModalType } from '../../../types/iModal';
import { iQuestion } from '../../../types/iQuiz';
import { iUser } from '../../../types/iUser';

interface iChangeButtonsGroupProps {
  data: iUser | iQuestion;
}

const ChangeButtonsGroup: React.FC<iChangeButtonsGroupProps> = React.memo(
  ({ data }) => {
    const { openModal } = useActions();

    const handleEditButton = useCallback(() => {
      if ('question' in data) {
        openModal({
          modalType: FabricModalType.newQuestion,
          modalData: data,
        });
      } else if ('username' in data) {
        openModal({
          modalType: FabricModalType.NewUser,
          modalData: data,
        });
      }
    }, [data, openModal]);

    const handleDeleteButton = useCallback(() => {
      openModal({
        modalType: FabricModalType.delConfirm,
        modalData: data,
      });
    }, [data, openModal]);

    return (
      <ButtonGroup>
        <Button variant="primary" onClick={handleEditButton}>
          <PencilSquare />
        </Button>
        <Button variant="danger" onClick={handleDeleteButton}>
          <TrashBucket />
        </Button>
      </ButtonGroup>
    );
  },
);

ChangeButtonsGroup.displayName = 'ChangeButtonsGroup';

export default ChangeButtonsGroup;
