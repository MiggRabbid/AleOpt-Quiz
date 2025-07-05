import { useEffect, useState } from 'react';
import { Box, FormControl } from '@mui/material';
import Divider from '@mui/material/Divider';

import { useAppSelector } from '@/hooks';
import { getGlobalStateField } from '@/selectors';
import { useUserForm } from './hooks/useUserForm';

import { CustomInput } from '@/shared/ui/ui/inputs/CustomInput';
import { BtnGroup, BtnMain } from '@/shared/ui/ui/btns';
import { CustomSelect } from '@/shared/ui/ui/select/CustomSelect';

import type { TCustomSelectItems } from '@/shared/ui/ui/select/CustomSelect';
import { UserRoles, userRolesMap } from '@/types/staff.types';
import { TTypeModal } from '@/types/modal.types';

interface IEditorUserProps {
  clickOnClose: () => void;
}

const selectItems: TCustomSelectItems = Object.entries(userRolesMap).map(
  ([key, value]) => ({
    value: key,
    text: value,
  }),
);

const EditorUser = (props: IEditorUserProps) => {
  const { clickOnClose } = props;

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const editableUser = useAppSelector(getGlobalStateField('editableUser'));
  const isNewUser = !editableUser && userEditorModal === TTypeModal.newUser;

  const { handleSubmit, onSubmit, errors, register, watch, setValue, isSubmitting } =
    useUserForm(isNewUser);
  const [passIsActive, setPassIsActive] = useState<boolean>(false);

  useEffect(() => {
    setPassIsActive(isNewUser);

    if (editableUser) {
      setValue('firstname', editableUser.firstName ?? '');
      setValue('lastname', editableUser.lastName ?? '');
      setValue('username', editableUser.username);
      setValue('userRole', editableUser.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="flex h-fit w-170 flex-col gap-10">
      <Box className="flex h-fit w-full flex-col gap-5">
        <h4 className="text-3xl font-bold">Создание пользователя</h4>
        <Divider />
      </Box>
      <FormControl
        component="form"
        className="lex! h-fit w-full flex-row! flex-wrap! items-center justify-center gap-x-5 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className="w-80">
          <CustomInput
            type="text"
            label="Введите Имя"
            register={register('firstname')}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
          />
        </Box>
        <Box className="w-80">
          <CustomInput
            type="text"
            label="Введите Фамилию"
            register={register('lastname')}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
        </Box>
        <Box className="w-80">
          <CustomInput
            type="text"
            label="Введите логин"
            register={register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Box>
        <Box className="w-80">
          <CustomInput
            type="password"
            label="Введите пароль"
            register={register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={!passIsActive}
          />
        </Box>
        <Box className="w-80">
          <CustomSelect
            label="Выберите роль"
            items={selectItems}
            value={watch('userRole')}
            onChange={(event) => {
              const value = event.target.value as UserRoles;
              register('userRole').onChange({
                target: { name: 'userRole', value },
                type: 'change',
              } as any);
            }}
            error={!!errors.userRole}
          />
        </Box>
        {!isNewUser && (
          <Box className="w-80">
            <BtnMain
              btnClick={() => setPassIsActive(!passIsActive)}
              btnText={passIsActive ? 'Отменить изменение пароля' : 'Сменить пароль'}
              fullWidth
              color="inherit"
              variant={passIsActive ? 'contained' : 'outlined'}
            />
          </Box>
        )}

        <Box className="mt-8 flex w-full flex-col gap-5">
          <Divider />
          <BtnGroup
            isLoading={isSubmitting}
            leftBtnText="Отменить"
            leftBtnClick={clickOnClose}
            leftBtnColor="success"
            leftBtnVariant="outlined"
            rightBtnText="Сохранить"
            rightBtnType="submit"
            rightBtnColor="success"
            rightBtnVariant="contained"
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default EditorUser;
