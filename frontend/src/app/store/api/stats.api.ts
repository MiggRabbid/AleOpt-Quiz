import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../../routes';

import { iQuestion } from '../../../types/iQuiz';
import { typeApiResponse } from '../../../types/types';
import { iUserStats } from '../../../types/iStats';

type typeUserStatsRequest = {
  headers: typeApiResponse;
  params: { username: string };
};

type typeAddUserStatsRequest = {
  headers: typeApiResponse;
  body: string;
  params: { username: string };
};

const statsApi = createApi({
  reducerPath: 'statsApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SERVER_URL,
  }),
  endpoints: (build) => ({
    getAllStats: build.query<iQuestion[], typeApiResponse>({
      query: (userHeaders) => ({
        url: routes.allStatsRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...userHeaders,
        },
      }),
    }),
    getUserStats: build.query<iUserStats, typeUserStatsRequest>({
      query: (request) => ({
        url: routes.userStatsRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { username: request.params?.username },
      }),
    }),
    addUserStats: build.mutation<iUserStats, typeAddUserStatsRequest>({
      query: (request) => ({
        url: routes.userStatsRequestPath(),
        method: 'PUT',
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
  useGetAllStatsQuery,
  useLazyGetAllStatsQuery,
  useGetUserStatsQuery,
  useLazyGetUserStatsQuery,
  useAddUserStatsMutation,
} = statsApi;

export default statsApi;
