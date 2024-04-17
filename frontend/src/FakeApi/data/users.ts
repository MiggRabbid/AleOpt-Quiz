type UserRole = 'admin' | 'employee';

interface iUser {
  role: UserRole;
  name: string;
  username: string;
  password: string,
  token: string;
}

const users: { [key: string]: iUser } = {
  admin: {
    role: 'admin',
    name: 'Иван',
    username: 'admin',
    password: 'admin',
    token: '1234ABCD',
  },
  vlad123: {
    role: 'employee',
    name: 'Vlad',
    username: 'vlad123',
    password: 'vlad123',
    token: '5678EFGH',
  }
};

export default users;