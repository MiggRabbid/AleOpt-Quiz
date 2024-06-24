import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../routes';

import { iUser } from '../models/interfaces';
import { typeApiResponse } from '../models/types';

type typeAddNewUserRequest = {
  headers: typeApiResponse;
  body: iUser;
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
  }),
});

export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useAddNewUserMutation,
} = usersApi;
export default usersApi;
