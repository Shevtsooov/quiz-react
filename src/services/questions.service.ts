import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from '../types/question';

export const QuestionsApi = createApi({
  reducerPath: 'QuestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://quiz-server-3co9.onrender.com'
  }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Question[], void>({
      query: () => 'questions'
    }),
    addQuestion: builder.mutation<Question, Partial<Question>>({
      query: (body) => ({
        url: `questions`,
        method: 'POST',
        body,
      }),
    }),
    editQuestion: builder.mutation<Question, Partial<Question>>({
      query: (body) => ({
        url: `questions`,
        method: 'PATCH',
        body,
      }),
    }),
  })
})

export const {
  useGetAllQuestionsQuery,
  useAddQuestionMutation,
  useEditQuestionMutation
} = QuestionsApi;
