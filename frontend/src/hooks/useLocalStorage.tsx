'use client';

import { iTimer } from '@/types/quiz';
import { iUser, iUserAnswer } from '@/types/staff';

export const useLocalStorage = () => {
  const setUser = (data: iUser) => {
    if (typeof window === 'undefined') return null;
    return localStorage.setItem('user', JSON.stringify(data));
  };
  const getUser = () => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('user') || 'null');
  };
  const delUser = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem('user');
  };
  const setResult = (data: iUserAnswer[]) => {
    if (typeof window === 'undefined') return;
    return localStorage.setItem('result', JSON.stringify({ answers: data }));
  };
  const getResult = (): { answers: iUserAnswer[] } | null => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('result') || 'null');
  };
  const delResult = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem('result');
  };

  const setTimer = (data: iTimer) => {
    if (typeof window === 'undefined') return;
    return localStorage.setItem('timer', JSON.stringify({ timer: data }));
  };
  const getTimer = (): { timer: iTimer } | null => {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('timer') || 'null');
  };
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Delete timer from local storage
   * @returns {void}
   */
  /*******  13fe0502-f751-4805-a2df-ad94a917bd57  *******/
  const delTimer = () => {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem('timer');
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
