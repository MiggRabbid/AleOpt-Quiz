'use client';

import { iTimer } from '@/types/quiz.types';
import { iUser, iUserAnswer } from '@/types/staff.types';

const USER = 'user';
const RESULT = 'result';
const TIMER = 'timer';

export const useLocalStorage = () => {
  const setUser = (data: iUser) => {
    if (typeof window === 'undefined') return null;
    return localStorage.setItem(USER, JSON.stringify(data));
  };
  const getUser = () => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(USER) || 'null');
  };
  const delUser = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem(USER);
  };

  const setResult = (data: iUserAnswer[]) => {
    if (typeof window === 'undefined') return;
    return localStorage.setItem(RESULT, JSON.stringify({ answers: data }));
  };
  const getResult = (): { answers: iUserAnswer[] } | null => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(RESULT) || 'null');
  };
  const delResult = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem(RESULT);
  };

  const setTimer = (data: iTimer) => {
    if (typeof window === 'undefined') return;
    return localStorage.setItem(TIMER, JSON.stringify({ timer: data }));
  };
  const getTimer = (): { timer: iTimer } | null => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem(TIMER) || 'null');
  };
  const delTimer = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem(TIMER);
  };

  return {
    setUser,
    getUser,
    delUser,
    setResult,
    getResult,
    delResult,
    setTimer,
    getTimer,
    delTimer,
  };
};
