import { useContext } from 'react';

import AuthContext from '../app/context/index';

const useAuth = () => useContext(AuthContext);

export default useAuth;
