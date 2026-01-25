import { useEffect, useState } from 'react';
import { UserGender, type TypeAvatarsMap, type TypeSubfolders } from '@app/types';
import { getRandomNumber } from '@/shared/lib';

// Этот костыль нужно оптимизировать
// "Магическое" формирование путей к аватарам
// Цифры в AVATAR_COUNTER должны соответствовать количеству аватаров в папках

const AVATAR_DIR = '/assets/avatars';
const AVATAR_EXTENSION = '.jpg';
const AVATAR_COUNTER: Record<TypeSubfolders, number> = {
  females: 11,
  males: 6,
};

const NAME_MAP = {
  females: 'female',
  males: 'male',
};

export const useAvatars = () => {
  const [avatarsMap, setAvatarsMap] = useState<TypeAvatarsMap>({
    females: {},
    males: {},
  });

  useEffect(() => {
    const newAvatarsMap: TypeAvatarsMap = avatarsMap;

    (Object.keys(AVATAR_COUNTER) as TypeSubfolders[]).forEach((subfolder) => {
      for (let i = 1; i <= AVATAR_COUNTER[subfolder]; i++) {
        const name = `${NAME_MAP[subfolder]}${i}`;
        const path = `${AVATAR_DIR}/${subfolder}/${name}${AVATAR_EXTENSION}`;
        newAvatarsMap[subfolder][name] = path;
      }
    });

    setAvatarsMap(newAvatarsMap);
  }, []);

  const getNewRandomAvatar = (gender: UserGender) => {
    const genderKey: TypeSubfolders = gender === UserGender.male ? 'males' : 'females';
    const avatars = avatarsMap[genderKey];
    const avatarCount = Object.keys(avatars).length;

    if (avatarCount === 0) return '';

    const fileName = gender + getRandomNumber(avatarCount);
    return avatars[fileName];
  };

  return { avatarsMap, getNewRandomAvatar };
};
