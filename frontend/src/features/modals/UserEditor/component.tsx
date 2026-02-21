// Библиотеки
import { useEffect, useLayoutEffect, useState } from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
// Логика
import { useAppSelector, useAvatars } from '@app/hooks';
import { getGlobalStateField } from '@app/selectors';
import { useUserForm } from './hooks/useForm';
// Компоненты
import {
  CustomInput,
  BtnGroup,
  BtnMain,
  CustomSelect,
  ModalContainer,
  UserAvatar,
} from '@/shared/ui';
// Типизация
import type { TCustomSelectItems } from '@/shared/ui';
import {
  type IAvatarItem,
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

interface IAvatarPickerModalProps {
  isOpen: boolean;
  selectedAvatar: string;
  avatars: IAvatarItem[];
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelect: (avatarSrc: string) => void;
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

const AvatarPickerModal = (props: IAvatarPickerModalProps) => {
  const { isOpen, onClose, avatars, selectedAvatar, onSelect } = props;

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <Box className="flex h-fit max-h-[80vh] w-[760px] max-w-[96vw] flex-col gap-4 overflow-hidden p-6">
        <Box className="pr-10">
          <h5 className="text-2xl font-bold">Выбор аватарки</h5>
          <p className="text-sm text-slate-500">
            Нажмите на изображение, чтобы выбрать аватар
          </p>
        </Box>
        <Divider />
        {avatars.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-500">
            В этой категории пока нет аватарок
          </p>
        )}
        <Box className="grid max-h-[60vh] grid-cols-3 gap-3 overflow-y-auto sm:grid-cols-4 md:grid-cols-5">
          {avatars.map((avatar) => {
            const isSelected = selectedAvatar === avatar.src;

            return (
              <Box
                key={avatar.src}
                component="button"
                type="button"
                onClick={() => onSelect(avatar.src)}
                className="cursor-pointer border-0 bg-transparent p-0 text-left"
              >
                <Box
                  className={`rounded-xl border-2 p-1 transition ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.name}
                    loading="lazy"
                    className="h-24 w-full rounded-lg object-cover"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </ModalContainer>
  );
};

const UserEditor = (props: IUserEditorProps) => {
  const { clickOnClose } = props;

  const userEditorModal = useAppSelector(getGlobalStateField('userEditorType'));
  const editableUser = useAppSelector(getGlobalStateField('editableUser'));

  const isNewUser = !editableUser && userEditorModal === TTypeModal.new;

  const [passIsActive, setPassIsActive] = useState<boolean>(false);
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState<boolean>(false);
  const { getAvatarsByGender } = useAvatars();

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

  const selectedGender = watch('gender') ?? UserGender.female;
  const selectedAvatar = watch('image') ?? '';
  const avatarsByGender = getAvatarsByGender(selectedGender);

  const handleAvatarSelect = (avatarSrc: string) => {
    setValue('image', avatarSrc, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setAvatarModalIsOpen(false);
  };

  return (
    <Box className="flex h-fit w-200 max-w-[98vw] flex-col gap-6 p-6">
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
        <Box className="mb-7 flex w-full flex-wrap items-center justify-between gap-4 px-2 py-0">
          <Box className="flex items-center gap-3">
            <UserAvatar src={selectedAvatar} />
          </Box>
          <Box className="w-full sm:w-60">
            <BtnMain
              btnText={isNewUser ? 'Выбрать аватар' : 'Изменить аватар'}
              btnClick={() => setAvatarModalIsOpen(true)}
              fullWidth
            />
          </Box>
          {!!errors.image && (
            <p className="w-full text-sm text-red-500">{errors.image.message}</p>
          )}
        </Box>

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
                color={passIsActive ? 'secondary' : 'primary'}
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
            leftBtnColor="secondary"
            leftBtnVariant="contained"
            rightBtnText="Сохранить"
            rightBtnType="submit"
            rightBtnColor="success"
            rightBtnVariant="contained"
            disabledRight={!savingAvailable}
          />
        </Box>
      </Box>
      <AvatarPickerModal
        isOpen={avatarModalIsOpen}
        onClose={() => setAvatarModalIsOpen(false)}
        avatars={avatarsByGender}
        selectedAvatar={selectedAvatar}
        onSelect={handleAvatarSelect}
      />
    </Box>
  );
};

export { UserEditor };
