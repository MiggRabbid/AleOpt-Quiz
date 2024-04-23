import { iUser } from '../../src/interfaces'
import { UserRole } from '../../src/types';

const users: { [key: string]: iUser } = {
  admin: {
    role: UserRole.Admin,
    name: 'Иван',
    username: 'admin',
    password: 'admin',
    token: '1234ABCD',
  },
  vlad123: {
    role: UserRole.Admin,
    name: 'Vlad',
    username: 'vlad123',
    password: 'vlad123',
    token: '5678EFGH',
  }
};

export default users;