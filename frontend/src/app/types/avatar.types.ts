type TypeMapItem = Record<string, string>;
export type TypeAvatarsMap = Record<TypeSubfolders, TypeMapItem>;
export type TypeSubfolders = 'males' | 'females';

export interface IAvatarItem {
  name: string;
  src: string;
}
