import { iUser, iUserAnswer } from '@/types/staff';

export const useLocalStorage = () => {
  const setUser = (data: iUser) => localStorage.setItem('user', JSON.stringify(data));
  const getUser = () => JSON.parse(localStorage.getItem('user') || 'null');
  const delUser = () => localStorage.removeItem('user');
  const setResult = (data: iUserAnswer[]) =>
    localStorage.setItem('result', JSON.stringify({ answers: data }));
  const getResult = () => JSON.parse(localStorage.getItem('result') || 'null');
  const delResult = () => localStorage.removeItem('result');

  return { setUser, getUser, delUser, setResult, getResult, delResult };
};
