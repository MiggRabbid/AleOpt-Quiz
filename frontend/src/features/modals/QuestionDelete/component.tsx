'use client';
// Библиотеки
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSnackbar } from 'notistack';
// Логика
import { useAppActions, useAppSelector } from '@app/hooks';
import { getGlobalStateField } from '@app/selectors';
import { useDeleteQuestion } from '@/app/api/hooks';
// Компоненты
import { BtnGroup } from '@/shared/ui';
// Типизация
import { TTypeModal, type iQuestion } from '@app/types';

interface IQuestionDeleteProps {
  clickOnClose: () => void;
}

const QuestionDelete = ({ clickOnClose }: IQuestionDeleteProps) => {
  const { setQuizStateField, closeQuestionEditor } = useAppActions();
  const { enqueueSnackbar } = useSnackbar();

  const questionEditorType = useAppSelector(getGlobalStateField('questionEditorType'));
  const editableQuestion = useAppSelector(getGlobalStateField('editableQuestion'));

  const { mutateAsync: QuestionDelete, isPending } = useDeleteQuestion({
    onSuccess: (data) => handleSuccess(data),
  });

  if (!editableQuestion || questionEditorType !== TTypeModal.delete) return null;

  const clickOnDelete = async () => {
    try {
      QuestionDelete({ params: { id: editableQuestion.id } });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuccess = (data: iQuestion[]) => {
    enqueueSnackbar('Вопрос удалён', { variant: 'success' });
    setQuizStateField({ field: 'questions', data });
    closeQuestionEditor();
  };

  return (
    <Box className="flex h-fit w-120 flex-col gap-5 p-6">
      <Box className="flex h-fit w-full flex-col gap-5">
        <h4 className="text-3xl font-bold">Удаление вопроса</h4>
        <Divider />
      </Box>
      <Box className="flex! h-fit w-full flex-row! flex-wrap! items-center justify-center gap-x-5 gap-y-2">
        <Box className="w-full">
          <p className="text-lg">Вы точно хотите удалить вопрос:</p>
          <p className="text-lg font-semibold">{`${editableQuestion.question}`}</p>
        </Box>

        <Box className="mt-3 flex w-full flex-col gap-5">
          <Divider />
          <BtnGroup
            isLoading={isPending}
            leftBtnText="Отменить"
            leftBtnClick={clickOnClose}
            leftBtnColor="success"
            leftBtnVariant="outlined"
            rightBtnText="Удалить"
            rightBtnType="button"
            rightBtnClick={clickOnDelete}
            rightBtnColor="error"
            rightBtnVariant="contained"
          />
        </Box>
      </Box>
    </Box>
  );
};

export { QuestionDelete };
