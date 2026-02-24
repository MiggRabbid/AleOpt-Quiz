import type { iResponseLogin, iTimer, iUserAnswer } from '@app/types';
import { useCallback } from 'react';

export enum LocalKeyMap {
  USER = 'user',
  RESULT = 'result',
  TIMER = 'timer',
}

interface IValueMap {
  [LocalKeyMap.USER]: iResponseLogin;
  [LocalKeyMap.RESULT]: iUserAnswer[];
  [LocalKeyMap.TIMER]: iTimer;
}

export const useLocalStorage = () => {
  const setLocalData = useCallback(
    <T extends LocalKeyMap>({ key, data }: { key: T; data: IValueMap[T] }) => {
      if (typeof window === 'undefined') return null;
      return localStorage.setItem(key, JSON.stringify(data));
    },
    [],
  );
  const getLocalData = useCallback(
    <T extends LocalKeyMap>({ key }: { key: T }): IValueMap[T] | null => {
      if (typeof window === 'undefined') return null;
      return JSON.parse(localStorage.getItem(key) || 'null');
    },
    [],
  );
  const delLocalData = useCallback(<T extends LocalKeyMap>({ key }: { key: T }) => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem(key);
  }, []);

  return {
    setLocalData,
    getLocalData,
    delLocalData,
  };
};
