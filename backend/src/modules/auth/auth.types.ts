export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoginResult {
  token: string;
  id: string;
  firstName: string;
  username: string;
  role: string;
  image: string;
}
