import { useState, ReactNode } from 'react';

import AuthContext from '../../context/index';
import { iUser } from '../../store/authSlice'

const TEST_USER: iUser = {username: 'Buzer', name: 'Vlad', role: 'admin', token: 'abcd1234'};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const currentUserString = localStorage.getItem('user');
  // const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const currentUser = TEST_USER;
  const [user, setUser] = useState(currentUser);

  const logIn = (data: iUser) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser({ role: data.role, name: data.name, username: data.username, token: data.token });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser({ username: '', name: '', role: 'employee', token: '' });
  };

  const getAuthHeader = () => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (localUser && localUser.token) {
      return { Authorization: `Bearer ${localUser.token}` };
    }
    return {};
  };
  
  console.log('AuthProvider -', currentUser);
  console.log('AuthProvider -', user);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider
      value={{
        user, logIn, logOut, getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;