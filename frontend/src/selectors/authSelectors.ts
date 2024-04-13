import { RootState } from '../store/index';

export const getError = (state: RootState) => state.authReducer.error;