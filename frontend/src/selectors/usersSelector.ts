import { RootState } from '../store/index';

const getAllUsers = (state: RootState) => state.usersSlice.users;

export default getAllUsers;
