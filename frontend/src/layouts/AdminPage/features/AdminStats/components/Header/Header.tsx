import { Dispatch, SetStateAction, useState } from 'react';
import { Box } from '@mui/material';

import { BtnAdd } from './ui/BtnAdd';
import { ButtonGroup } from './ui/ButtonGroup';

import { TypeStatsTab } from '@/layouts/AdminPage/types/AdminStats';
import { EditorUser } from '@/features/EditorUser';
import { EditorQuestion } from '@/features/EditorQuestion';
import { ModalContainer } from '@/shared/ui/layouts/ModalContainer';

interface IHeaderProps {
  activeTab: TypeStatsTab;
  setActiveTab: Dispatch<SetStateAction<TypeStatsTab>>;
}

const Header = (props: IHeaderProps) => {
  const { activeTab, setActiveTab } = props;

  const [userEditorOpen, setUserEditorOpen] = useState<boolean>(false);
  const [questionEditorOpen, setQuestionEditorOpen] = useState<boolean>(false);

  const handelOpenEditor = () => {
    if (activeTab === TypeStatsTab.users) {
      setUserEditorOpen(true);
      setQuestionEditorOpen(false);
    }
    if (activeTab === TypeStatsTab.questions) {
      setUserEditorOpen(false);
      setQuestionEditorOpen(true);
    }
  };

  const handelCloseEditor = () => {
    setUserEditorOpen(false);
    setQuestionEditorOpen(false);
  };

  return (
    <>
      <Box className="mb-5 flex w-full justify-between gap-4!">
        <ButtonGroup activeTab={activeTab} setState={setActiveTab} />
        <BtnAdd activeTab={activeTab} openEditor={handelOpenEditor} />
      </Box>

      {(userEditorOpen || questionEditorOpen) && (
        <ModalContainer
          isOpen={userEditorOpen || questionEditorOpen}
          onClose={handelCloseEditor}
        >
          {userEditorOpen && <EditorUser clickOnClose={handelCloseEditor} />}
          {questionEditorOpen && <EditorQuestion />}
        </ModalContainer>
      )}
    </>
  );
};

export { Header };
