import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../routes';

import { iQuestion } from '../models/interfaces';
import { typeApiResponse } from '../models/types';

const quizApi = createApi({
  reducerPath: 'quizApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SERVER_URL,
  }),
  endpoints: (build) => ({
    getAllQuestions: build.query<iQuestion[], typeApiResponse>({
      query: (userHeaders) => ({
        url: routes.questionsRequestPath(),
        headers: {
          'Content-Type': 'application/json',
          ...userHeaders,
        },
      }),
    }),
  }),
});

export const { useGetAllQuestionsQuery, useLazyGetAllQuestionsQuery } = quizApi;
export default quizApi;
