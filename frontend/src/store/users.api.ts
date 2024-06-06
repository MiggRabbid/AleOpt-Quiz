import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../routes';

import { iUser } from '../models/interfaces';
import { typeApiResponse } from '../models/types';

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
  }),
});

export const { useGetAllUsersQuery, useLazyGetAllUsersQuery } = usersApi;
export default usersApi;
