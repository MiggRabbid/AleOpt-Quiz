'use client';
// Библиотеки
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
// Логика
import { useAppActions, useAppSelector } from '@/hooks';
import { getGlobalStateField } from '@/selectors';
import { api } from '@/shared/api/api';
// Компоненты
import { BtnGroup } from '@/shared/ui/ui/btns';
// Типизация
import { TTypeModal } from '@/types/modal.types';

interface IDeleteUserProps {
  clickOnClose: () => void;
}

const DeleteUser = ({ clickOnClose }: IDeleteUserProps) => {
  console.log('render DeleteUser');
  const { data } = useSession();
  const { setQuizStateField } = useAppActions();

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const editableUser = useAppSelector(getGlobalStateField('editableUser'));

  const [isFetching, setIsFetching] = useState<boolean>(false);

  if (!editableUser || userEditorModal !== TTypeModal.deleteUser) return null;

  const clickOnDelete = async () => {
    console.group('clickOnDelete');
    const token = data?.user?.token;
    console.log('token -', token);
    if (!token) return;

    try {
      setIsFetching(true);

      const response = await api.deleteUser(editableUser.username, token);
      console.log('response -', response);

      if (response.data) {
        setQuizStateField({
          field: 'users',
          data: response.data,
        });
      }

      clickOnClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
      console.groupEnd();
    }
  };

  return (
    <Box className="flex h-fit w-120 flex-col gap-5">
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
            isLoading={isFetching}
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

export default DeleteUser;
