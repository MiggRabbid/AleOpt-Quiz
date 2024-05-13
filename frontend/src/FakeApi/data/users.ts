import { iUser } from '../../interfaces'
import { UserRole } from '../../types';

const users: { [key: string]: iUser } = {
  admin: {
    role: UserRole.Admin,
    name: 'Иван',
    username: 'admin',
    password: 'admin',
    token: '1234ABCD',
  },
  vlad123: {
    role: UserRole.Employee,
    name: 'Vlad',
    username: 'vlad123',
    password: 'vlad123',
    token: '5678EFGH',
  }
};

export default users;