'use client';
// Библиотеки
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSnackbar } from 'notistack';
// Логика
import { useAppActions, useAppSelector } from '@app/hooks';
import { getGlobalStateField } from '@app/selectors';
import { useDeleteUser } from '@/app/api/hooks';
// Компоненты
import { BtnGroup } from '@/shared/ui';
// Типизация
import { TTypeModal, type iUserStats } from '@app/types';

interface IUserDeleteProps {
  clickOnClose: () => void;
}

const UserDelete = ({ clickOnClose }: IUserDeleteProps) => {
  const { setQuizStateField, closeUserEditor } = useAppActions();
  const { enqueueSnackbar } = useSnackbar();

  const userEditorType = useAppSelector(getGlobalStateField('userEditorType'));
  const editableUser = useAppSelector(getGlobalStateField('editableUser'));

  const { mutateAsync: UserDelete, isPending } = useDeleteUser({
    onSuccess: (data) => handleSuccess(data),
  });

  if (!editableUser || userEditorType !== TTypeModal.delete) return null;

  const clickOnDelete = async () => {
    try {
      UserDelete({ params: { username: editableUser.username } });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuccess = (data: iUserStats[]) => {
    enqueueSnackbar('Пользователь удалён', { variant: 'success' });
    setQuizStateField({ field: 'users', data });
    closeUserEditor();
  };

  return (
    <Box className="flex h-fit w-120 flex-col gap-5 p-6">
      <Box className="flex h-fit w-full flex-col gap-5">
        <h4 className="text-3xl font-bold">Удаление пользователя</h4>
        <Divider />
      </Box>
      <Box className="flex! h-fit w-full flex-row! flex-wrap! items-center justify-center gap-x-5 gap-y-2">
        <Box className="w-full">
          <p className="text-lg">Вы точно хотите удалить пользователя:</p>
          <p className="text-lg font-semibold">{`${editableUser.firstName ?? '-'} ${editableUser.lastName ?? '-'} (${editableUser?.username})`}</p>
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

export { UserDelete };
