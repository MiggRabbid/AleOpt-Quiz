import React, { MouseEventHandler, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import useActions from '../../../hooks/useActions';

import TrashBucket from '../icons/TrashBucket';
import PencilSquare from '../icons/PencilSquare';

import { FabricModalType } from '../../../types/iModal';
import { iQuestion } from '../../../types/iQuiz';
import { iUser } from '../../../types/iUser';

interface iChangeButtonsGroupProps {
  data: iUser | iQuestion;
}

interface iCustomOverlay {
  variant: string;
  id: string;
  children: ReactNode;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

enum enumResponseData {
  question = 'question',
  username = 'username',
}

const CustomOverlay: React.FC<iCustomOverlay> = ({ variant, id, children, title, onClick }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>} placement="bottom">
    <Button variant={variant} data-bs-toggle="tooltip" data-bs-placement="bottom" onClick={onClick}>
      {children}
    </Button>
  </OverlayTrigger>
);

const ChangeButtonsGroup: React.FC<iChangeButtonsGroupProps> = React.memo(({ data }) => {
  const { openModal } = useActions();
  const { t } = useTranslation();

  const handleEditButton = useCallback(() => {
    if (enumResponseData.question in data) {
      openModal({
        modalType: FabricModalType.editQuestion,
        modalData: data,
      });
    } else if (enumResponseData.username in data) {
      openModal({
        modalType: FabricModalType.editUser,
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
      <CustomOverlay
        variant="primary"
        title={t('shared.buttons.changeGroup.edit')}
        id="btnEdit"
        onClick={handleEditButton}
      >
        <PencilSquare />
      </CustomOverlay>
      <CustomOverlay
        variant="danger"
        title={t('shared.buttons.changeGroup.del')}
        id="btnDel"
        onClick={handleDeleteButton}
      >
        <TrashBucket />
      </CustomOverlay>
    </ButtonGroup>
  );
});

ChangeButtonsGroup.displayName = 'ChangeButtonsGroup';

export default ChangeButtonsGroup;
