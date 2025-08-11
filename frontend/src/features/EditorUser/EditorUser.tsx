'use client';
// Библиотеки
import { useEffect, useLayoutEffect, useState } from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
// Логика
import { useAppSelector, useAvatars } from '@/hooks';
import { getGlobalStateField } from '@/selectors';
import { useUserForm } from './hooks/useUserForm';
import { getRandomNumber, TypeSubfolders } from '@/shared/lib';
// Компоненты
import { CustomInput } from '@/shared/ui/ui/inputs/CustomInput';
import { BtnGroup, BtnMain } from '@/shared/ui/ui/btns';
import { CustomSelect } from '@/shared/ui/ui/select/CustomSelect';
// Типизация
import type { TCustomSelectItems } from '@/shared/ui/ui/select/CustomSelect';
import { UserGender, userGenderMap, UserRoles, userRolesMap } from '@/types/staff.types';
import { TTypeModal } from '@/types/modal.types';

interface IEditorUserProps {
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

const EditorUser = (props: IEditorUserProps) => {
  const { clickOnClose } = props;

  const { avatarsMap } = useAvatars();
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
      setValue('image', editableUser.image ?? '');
      setPassIsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editableUser?.image) {
      const userGender = watch('gender') as UserGender;

      const genderKey: TypeSubfolders =
        userGender === UserGender.male ? 'males' : 'females';
      const avatars = avatarsMap[genderKey];
      const avatarCount = Object.keys(avatars).length;

      if (avatarCount > 0) {
        const fileName = userGender + getRandomNumber(avatarCount);
        setValue('image', avatars[fileName]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarsMap]);

  return (
    <Box className="flex h-fit w-170 flex-col gap-10">
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
        <Box className="w-80">
          <CustomInput
            type="text"
            label="Введите Имя"
            register={register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Box>
        <Box className="w-80">
          <CustomInput
            type="text"
            label="Введите Фамилию"
            register={register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
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
        <Box className="flex w-100 gap-x-5 gap-y-2">
          <Box className="w-50">
            <CustomSelect
              label="Выберите роль"
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
          <Box className="grow-1">
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
        </Box>
        {!isNewUser && (
          <Box className="w-60">
            <BtnMain
              btnClick={() => setPassIsActive(!passIsActive)}
              btnText={passIsActive ? 'Не изменять пароль' : 'Изменить пароль'}
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
            disabledRight={!savingAvailable}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditorUser;
