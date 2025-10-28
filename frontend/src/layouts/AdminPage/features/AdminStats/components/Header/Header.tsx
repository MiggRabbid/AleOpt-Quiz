import { Dispatch, SetStateAction } from 'react';
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
import { DeleteQuestion } from '@/features/DeleteQuestion';

interface IHeaderProps {
  activeTab: TypeStatsTab;
  setActiveTab: Dispatch<SetStateAction<TypeStatsTab>>;
}

const Header = (props: IHeaderProps) => {
  const { activeTab, setActiveTab } = props;

  const { openUserEditor, closeUserEditor, openQuestionEditor, closeQuestionEditor } =
    useAppActions();

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const userEditorOpen = !!userEditorModal && userEditorModal !== TTypeModal.delete;
  const userDeleteOpen = !!userEditorModal && userEditorModal === TTypeModal.delete;

  const questionEditorModal = useAppSelector(getGlobalStateField('questionEditorType'));
  const questionEditorOpen =
    !!questionEditorModal && questionEditorModal !== TTypeModal.delete;
  const questionDeleteOpen =
    !!questionEditorModal && questionEditorModal === TTypeModal.delete;

  const modalContainerIsOpen =
    userEditorOpen || userDeleteOpen || questionEditorOpen || questionDeleteOpen;

  const handelOpenEditor = () => {
    if (activeTab === TypeStatsTab.users) {
      closeQuestionEditor();
      openUserEditor({
        type: TTypeModal.new,
        editableUser: null,
      });
    }
    if (activeTab === TypeStatsTab.questions) {
      closeUserEditor();
      openQuestionEditor({
        type: TTypeModal.new,
        editableQuestion: null,
      });
    }
  };

  const handelCloseEditor = () => {
    closeUserEditor();
    closeQuestionEditor();
  };

  return (
    <>
      <Box className="mb-6 flex w-full justify-between gap-4!">
        <ButtonGroup activeTab={activeTab} setState={setActiveTab} />
        <BtnAdd activeTab={activeTab} openEditor={handelOpenEditor} />
      </Box>

      {modalContainerIsOpen && (
        <ModalContainer isOpen={modalContainerIsOpen} onClose={handelCloseEditor}>
          {userEditorOpen && <EditorUser clickOnClose={handelCloseEditor} />}
          {userDeleteOpen && <DeleteUser clickOnClose={handelCloseEditor} />}
          {questionEditorOpen && <EditorQuestion clickOnClose={handelCloseEditor} />}
          {questionDeleteOpen && <DeleteQuestion clickOnClose={handelCloseEditor} />}
        </ModalContainer>
      )}
    </>
  );
};

export { Header };
