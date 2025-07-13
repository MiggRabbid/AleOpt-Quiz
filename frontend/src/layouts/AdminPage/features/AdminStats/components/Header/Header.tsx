import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { useAppActions, useAppSelector } from '@/hooks';
import { getGlobalStateField } from '@/selectors';

import { BtnAdd } from './ui/BtnAdd';
import { ButtonGroup } from './ui/ButtonGroup';

import { EditorUser } from '@/features/EditorUser';
import { EditorQuestion } from '@/features/EditorQuestion';
import { ModalContainer } from '@/shared/ui/layouts/ModalContainer';

import { TTypeModal } from '@/types/modal.types';
import { TypeStatsTab } from '@/layouts/AdminPage/types/AdminStats';
import { DeleteUser } from '@/features/DeleteUser';

interface IHeaderProps {
  activeTab: TypeStatsTab;
  setActiveTab: Dispatch<SetStateAction<TypeStatsTab>>;
}

const Header = (props: IHeaderProps) => {
  const { activeTab, setActiveTab } = props;

  const { openUserEditor, closeUserEditor } = useAppActions();

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const userEditorOpen = !!userEditorModal && userEditorModal !== TTypeModal.deleteUser;
  const userDeleteOpen = !!userEditorModal && userEditorModal === TTypeModal.deleteUser;

  const [questionEditorOpen, setQuestionEditorOpen] = useState<boolean>(false);

  const modalContainerIsOpen = userEditorOpen || userDeleteOpen || questionEditorOpen;

  useEffect(() => {
    console.log('Change userEditorModal -', userEditorModal);
  }, [userEditorModal]);

  useEffect(() => {
    console.log('Change userEditorOpen -', userEditorOpen);
    console.log('Change userDeleteOpen -', userDeleteOpen);
  }, [userEditorOpen, userDeleteOpen]);

  useEffect(() => {
    console.log('Change modalContainerIsOpen -', modalContainerIsOpen);
  }, [modalContainerIsOpen]);

  const handelOpenEditor = () => {
    console.log('handelOpenEditor -');
    if (activeTab === TypeStatsTab.users) {
      openUserEditor({
        type: TTypeModal.newUser,
        editableUser: null,
      });
      setQuestionEditorOpen(false);
    }
    if (activeTab === TypeStatsTab.questions) {
      closeUserEditor();
      setQuestionEditorOpen(true);
    }
  };

  const handelCloseEditor = () => {
    console.log('handelOpenEditor -');
    closeUserEditor();
    setQuestionEditorOpen(false);
  };

  return (
    <>
      <Box className="mb-5 flex w-full justify-between gap-4!">
        <ButtonGroup activeTab={activeTab} setState={setActiveTab} />
        <BtnAdd activeTab={activeTab} openEditor={handelOpenEditor} />
      </Box>

      {modalContainerIsOpen && (
        <ModalContainer isOpen={modalContainerIsOpen} onClose={handelCloseEditor}>
          {userEditorOpen && <EditorUser clickOnClose={handelCloseEditor} />}
          {userDeleteOpen && <DeleteUser clickOnClose={handelCloseEditor} />}
          {questionEditorOpen && <EditorQuestion />}
        </ModalContainer>
      )}
    </>
  );
};

export { Header };
