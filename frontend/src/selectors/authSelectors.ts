import { RootState } from '../app/store/index';

export const getError = (state: RootState) => state.authReducer.error;
export const isAuth = (state: RootState) => state.authReducer.isAuthenticated;
