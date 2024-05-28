import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { iQuestion } from '../models/interfaces';
import { typeHeaderResponse } from '../models/types';

const quizApi = createApi({
  reducerPath: 'quizApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
  }),
  endpoints: (build) => ({
    getAllQuestions: build.query<iQuestion[], typeHeaderResponse>({
      query: (userHeaders) => ({
        url: 'data/questions',
        headers: userHeaders,
      }),
    }),
  }),
});

export const { useGetAllQuestionsQuery, useLazyGetAllQuestionsQuery } = quizApi;
export default quizApi;
