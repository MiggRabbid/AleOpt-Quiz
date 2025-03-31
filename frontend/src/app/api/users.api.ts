import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../routes';

import { iUser } from '../../types/iUser';
import { typeApiResponse } from '../../types/types';

export type typeAddNewUserRequest = {
  headers: typeApiResponse;
  body: iUser;
  params?: { username: string } | undefined;
};

export type typeGetCurUserRequest = {
  headers: typeApiResponse;
  params: { username: string } | undefined;
};

const usersApi = createApi({
  reducerPath: 'usersApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SERVER_URL,
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getAllUsers: build.query<iUser[], typeApiResponse>({
      query: (userHeaders) => ({
        url: routes.usersRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...userHeaders,
        },
      }),
      providesTags: ['Users'],
    }),
    getCurrentUser: build.query<iUser, typeGetCurUserRequest>({
      query: (request) => ({
        url: routes.curUserRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { username: request.params?.username },
      }),
      providesTags: ['Users'],
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
      invalidatesTags: ['Users'],
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
      invalidatesTags: ['Users'],
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
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApi;
export default usersApi;
