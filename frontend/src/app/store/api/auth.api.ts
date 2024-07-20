import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../../routes';

import { iUser } from '../../../types/interfaces/iUser';
import { typeApiResponse } from '../../../types/types';

const authApi = createApi({
  reducerPath: 'authApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SERVER_URL,
  }),
  endpoints: (build) => ({
    logIn: build.mutation<iUser, typeApiResponse>({
      query: (userData) => ({
        url: routes.loginRequestPath(),
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLogInMutation } = authApi;
export default authApi;
