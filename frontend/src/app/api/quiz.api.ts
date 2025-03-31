import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes, { BASE_SERVER_URL } from '../routes';

import { iQuestion } from '../../types/iQuiz';
import { typeApiResponse } from '../../types/types';

type typeAddNewQuestionRequest = {
  headers: typeApiResponse;
  body: iQuestion;
  params?: { id: string };
};

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
    addNewQuestion: build.mutation<iQuestion[], typeAddNewQuestionRequest>({
      query: (request) => ({
        url: routes.questionsRequestPath(),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        body: request.body,
      }),
    }),
    editQuestion: build.mutation<iQuestion[], typeAddNewQuestionRequest>({
      query: (request) => ({
        url: routes.questionsRequestPath(),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { id: request.params?.id },
        body: request.body,
      }),
    }),
    deleteQuestion: build.mutation<iQuestion[], typeAddNewQuestionRequest>({
      query: (request) => ({
        url: routes.questionsRequestPath(),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...request.headers,
        },
        params: { id: request.params?.id },
        body: request.body,
      }),
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useLazyGetAllQuestionsQuery,
  useAddNewQuestionMutation,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
} = quizApi;
export default quizApi;
