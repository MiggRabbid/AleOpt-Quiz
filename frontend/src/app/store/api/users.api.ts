import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../../routes';

import { iUser } from '../../../types/iUser';
import { typeApiResponse } from '../../../types/types';

type typeAddNewUserRequest = {
  headers: typeApiResponse;
  body: iUser;
  params?: { username: string } | undefined;
};

const usersApi = createApi({
  reducerPath: 'usersApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SERVER_URL,
  }),
  endpoints: (build) => ({
    getAllUsers: build.query<iUser[], typeApiResponse>({
      query: (userHeaders) => ({
        url: routes.usersRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...userHeaders,
        },
      }),
    }),
    addNewUser: build.mutation<iUser[], typeAddNewUserRequest>({
      query: (request) => ({
        url: routes.usersRequestPath(),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        body: request.body,
      }),
    }),
    editUser: build.mutation<iUser[], typeAddNewUserRequest>({
      query: (request) => ({
        url: routes.usersRequestPath(),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { username: request.params?.username },
        body: request.body,
      }),
    }),
    deleteUser: build.mutation<iUser[], typeAddNewUserRequest>({
      query: (request) => ({
        url: routes.usersRequestPath(),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { username: request.params?.username },
        body: request.body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApi;
export default usersApi;
