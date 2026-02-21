import {
  UserGender,
  type IAvatarItem,
  type TypeAvatarsMap,
  type TypeSubfolders,
} from '@app/types';

const avatarModules = import.meta.glob(
  '/public/assets/avatars/{females,males}/*.{jpg,jpeg,png,webp,avif,svg}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>;

const getPublicAssetPath = (path: string) => {
  if (path.startsWith('/assets/')) {
    return path;
  }

  return path.replace('/public', '');
};

const avatarMap = Object.entries(avatarModules).reduce<TypeAvatarsMap>(
  (acc, [filePath, publicPath]) => {
    const isMale = filePath.includes('/males/');
    const subfolder: TypeSubfolders = isMale ? 'males' : 'females';

    const fileNameWithExtension = filePath.split('/').pop();
    const fileName = fileNameWithExtension?.replace(/\.[^.]+$/, '');

    if (!fileName) {
      return acc;
    }

    acc[subfolder][fileName] = getPublicAssetPath(publicPath);
    return acc;
  },
  { females: {}, males: {} },
);

const getSortedAvatarEntries = (avatars: Record<string, string>) =>
  Object.entries(avatars).sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' }),
  );

export const useAvatars = () => {
  const getNewRandomAvatar = (gender: UserGender) => {
    const genderKey: TypeSubfolders = gender === UserGender.male ? 'males' : 'females';
    const avatars = avatarMap[genderKey];
    const avatarEntries = getSortedAvatarEntries(avatars);
    const avatarCount = avatarEntries.length;

    if (avatarCount === 0) return '';

    const randomIndex = Math.floor(Math.random() * avatarCount);
    return avatarEntries[randomIndex]?.[1] ?? '';
  };

  const getAvatarsByGender = (gender: UserGender): IAvatarItem[] => {
    const genderKey: TypeSubfolders = gender === UserGender.male ? 'males' : 'females';
    const avatars = avatarMap[genderKey];

    return getSortedAvatarEntries(avatars).map(([name, src]) => ({ name, src }));
  };

  return { avatarsMap: avatarMap, getNewRandomAvatar, getAvatarsByGender };
};
