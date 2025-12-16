import { useContext } from 'react';

import { AuthContext } from '@app/context';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
