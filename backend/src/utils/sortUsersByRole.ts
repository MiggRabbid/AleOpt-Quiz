import { type IResponseUser, UserRoles } from '../types';

const roleMapping: { [key in UserRoles]: number } = {
  [UserRoles.Owner]: 1,
  [UserRoles.Admin]: 2,
  [UserRoles.Employee]: 3,
};

const sortUsersByRole = (users: IResponseUser[]) => {
  const sortedUsers = users.sort((firstUser, secondUser) => {
    const firstRole = typeof firstUser.role === 'string' ? firstUser.role : firstUser.role.value;
    const secondRole =
      typeof secondUser.role === 'string' ? secondUser.role : secondUser.role.value;

    return roleMapping[firstRole as UserRoles] - roleMapping[secondRole as UserRoles];
  });

  return sortedUsers;
};

export default sortUsersByRole;
