import { RootState } from '../app/store/index';

const getAllUsers = (state: RootState) => state.usersReducer.users;

export default getAllUsers;
