// Библиотеки
import { useLayoutEffect, useState } from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
// Логика
import { useAppSelector } from '@app/hooks';
import { getGlobalStateField } from '@app/selectors';
import { useUserForm } from './hooks/useForm';
// Компоненты
import { CustomInput, BtnGroup, BtnMain, CustomSelect } from '@/shared/ui';
// Типизация
import type { TCustomSelectItems } from '@/shared/ui';
import {
  UserGender,
  userGenderMap,
  UserRoles,
  userRolesMap,
  TTypeModal,
  UserStatus,
  userStatusMap,
} from '@app/types';

interface IUserEditorProps {
  clickOnClose: () => void;
}

const roleItems: TCustomSelectItems = Object.entries(userRolesMap).map(
  ([key, value]) => ({
    value: key,
    text: value,
  }),
);

const genderItems: TCustomSelectItems = Object.entries(userGenderMap).map(
  ([key, value]) => ({
    value: key,
    text: value,
  }),
);

const statusItems: TCustomSelectItems = Object.entries(userStatusMap).map(
  ([key, value]) => ({
    value: key,
    text: value,
  }),
);

const UserEditor = (props: IUserEditorProps) => {
  const { clickOnClose } = props;

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const editableUser = useAppSelector(getGlobalStateField('editableUser'));

  const isNewUser = !editableUser && userEditorModal === TTypeModal.new;

  const [passIsActive, setPassIsActive] = useState<boolean>(false);

  const requiredPass = isNewUser || (!isNewUser && passIsActive);

  const {
    savingAvailable,
    handleSubmit,
    onSubmit,
    errors,
    register,
    watch,
    setValue,
    isSubmitting,
  } = useUserForm({
    isNewUser,
    requiredPass,
    editableUserImage: editableUser?.image,
  });

  useLayoutEffect(() => {
    setPassIsActive(isNewUser);

    if (editableUser) {
      setValue('firstName', editableUser.firstName ?? '');
      setValue('lastName', editableUser.lastName ?? '');
      setValue('username', editableUser.username);
      setValue('role', editableUser.role);
      setValue(
        'gender',
        editableUser.gender ? UserGender[editableUser.gender] : UserGender.female,
      );
      setValue('status', editableUser.status);
      setValue('image', editableUser.image ?? '');
      setPassIsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="flex h-fit w-200 flex-col gap-10 p-6">
      <Box className="flex h-fit w-full flex-col gap-5">
        <h4 className="text-3xl font-bold">
          {isNewUser ? 'Создание пользователя' : 'Редактирование пользователя'}
        </h4>
        <Divider />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex! h-fit w-full flex-row! flex-wrap! items-center justify-center gap-x-5 gap-y-2"
      >
        <Box className="w-90">
          <CustomInput
            type="text"
            label="Введите Имя"
            register={register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Box>
        <Box className="w-90">
          <CustomInput
            type="text"
            label="Введите Фамилию"
            register={register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Box>
        <Box className="w-90">
          <CustomInput
            type="text"
            label="Введите логин"
            register={register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </Box>
        <Box className="w-90">
          <CustomInput
            type="password"
            label="Введите пароль"
            register={register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={!passIsActive}
          />
        </Box>

        <Box className="flex w-full grow-1 justify-between gap-x-5 gap-y-2 px-1.5">
          <Box className="max-w-90 min-w-45 shrink-1 grow-2">
            <CustomSelect
              label="Роль"
              items={roleItems}
              value={watch('role')}
              onChange={(event) => {
                const value = event.target.value as UserRoles;
                register('role').onChange({
                  target: { name: 'role', value },
                  type: 'change',
                } as any);
              }}
              error={!!errors.role}
            />
          </Box>
          <Box className="w-40 shrink-0 grow-0">
            <CustomSelect
              label="Пол"
              items={genderItems}
              value={watch('gender')}
              onChange={(event) => {
                const value = event.target.value as UserGender;
                register('gender').onChange({
                  target: { name: 'gender', value },
                  type: 'change',
                } as any);
              }}
              error={!!errors.gender}
            />
          </Box>
          <Box className="w-40 shrink-0 grow-0">
            <CustomSelect
              label="Статус"
              items={statusItems}
              value={watch('status')}
              onChange={(event) => {
                const value = event.target.value as UserStatus;
                register('status').onChange({
                  target: { name: 'status', value },
                  type: 'change',
                } as any);
              }}
              error={!!errors.status}
            />
          </Box>

          {!isNewUser && (
            <Box className="w-50">
              <BtnMain
                btnClick={() => setPassIsActive(!passIsActive)}
                btnText={passIsActive ? 'Не изменять пароль' : 'Изменить пароль'}
                fullWidth
                color="inherit"
                variant={passIsActive ? 'contained' : 'outlined'}
              />
            </Box>
          )}
        </Box>

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
            disabledRight={!savingAvailable}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { UserEditor };
