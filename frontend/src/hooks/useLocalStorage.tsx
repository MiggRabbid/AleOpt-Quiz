import { iUser, iUserAnswer } from '../types/iUser';

interface iUseLocalStorage {
  setUser: (data: iUser) => void;
  getUser: () => iUser | null;
  delUser: () => void;
  setResult: (data: iUserAnswer[]) => void;
  getResult: () => { answers: iUserAnswer[] };
  delResult: () => void;
}

const useLocalStorage: iUseLocalStorage = {
  setUser: (data) => localStorage.setItem('user', JSON.stringify(data)),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  delUser: () => localStorage.removeItem('user'),
  setResult: (data) =>
    localStorage.setItem('result', JSON.stringify({ answers: data })),
  getResult: () => JSON.parse(localStorage.getItem('result') || 'null'),
  delResult: () => localStorage.removeItem('result'),
};

export default useLocalStorage;
