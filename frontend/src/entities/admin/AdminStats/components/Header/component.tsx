import { Box } from '@mui/material';

import { BtnAdd, ButtonGroup } from './ui';

import { useAppActions, useAppSelector } from '@/app/hooks';
import { getGlobalStateField } from '@/app/selectors';

import { ModalContainer } from '@/shared/ui';
import { QuestionEditor, QuestionDelete, UserDelete } from '@/features';

import type { Dispatch, SetStateAction } from 'react';
import { TypeStatsTab } from '../../component.types';
import { TTypeModal } from '@/app/types';

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
          {userDeleteOpen && <UserDelete clickOnClose={handelCloseEditor} />}
          {/* {userEditorOpen && <EditorUser clickOnClose={handelCloseEditor} />} */}
          {questionEditorOpen && <QuestionDelete clickOnClose={handelCloseEditor} />}
          {questionDeleteOpen && <QuestionEditor clickOnClose={handelCloseEditor} />}
        </ModalContainer>
      )}
    </>
  );
};

export { Header };
