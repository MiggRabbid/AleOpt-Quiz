import { RootState } from '../app/store/index';

export const getAllUsers = (state: RootState) => state.usersReducer.users;

export const getCurrUser = (state: RootState) => state.usersReducer.currentUser;
