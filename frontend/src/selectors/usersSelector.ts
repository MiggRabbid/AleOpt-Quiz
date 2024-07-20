import { RootState } from '../app/store/index';

const getAllUsers = (state: RootState) => state.usersSlice.users;

export default getAllUsers;
