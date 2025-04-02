export interface iAuthError {
  data: {
    message: string;
    errorType: string;
  };
  status: number;
}

export interface iResponseLogin {
  token: string;
  username: string;
  role: UserRoles;
}

export interface iRequestLogin {
  username: string;
  password: string;
}
