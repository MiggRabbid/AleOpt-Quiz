import fs from 'fs';
import path from 'path';

export type TypeSubfolders = 'males' | 'females';
type TypeMapItem = Record<string, string>;
export type TypeAvatarsMap = Record<TypeSubfolders, TypeMapItem>;

export const getAvatarPaths = (): TypeAvatarsMap => {
  const baseDir = path.join(process.cwd(), 'public/assets/avatars');

  const avatarsMap: TypeAvatarsMap = {
    females: {},
    males: {},
  };
  const getPathsFromSubfolder = (subfolder: TypeSubfolders) => {
    const dir = path.join(baseDir, subfolder);

    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);

    return files.forEach((file) => {
      avatarsMap[subfolder][file.replace('.jpg', '')] =
        `/assets/avatars/${subfolder}/${file}`;
    });
  };

  getPathsFromSubfolder('males');
  getPathsFromSubfolder('females');

  return avatarsMap;
};
