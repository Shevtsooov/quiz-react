import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question, Questions } from '../types/question';

export const QuestionsApi = createApi({
  reducerPath: 'QuestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://quiz-server-3co9.onrender.com'
  }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Questions, void>({
      query: () => 'questions'
    }),
    findAndCountQuestions: builder.query<Questions, {
      query?: string;
      categoryName?: string;
      difficulty?: string,
      offset?: number
    }>({
      query: ({ offset, query, categoryName, difficulty }) => ({
        url: `questions?offset=${offset}&query=${query}&categoryName=${categoryName}&difficulty=${difficulty}`,
      }),
    }),
    addQuestion: builder.mutation<Questions, Partial<Question>>({
      query: (body) => ({
        url: `questions`,
        method: 'POST',
        body,
      }),
    }),
    editQuestion: builder.mutation<Questions, Partial<Question>>({
      query: (body) => ({
        url: `questions`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteQuestion: builder.mutation<Questions, Partial<Question>>({
      query: (body) => ({
        url: `questions`,
        method: 'DELETE',
        body,
      }),
    }),
  })
})

export const {
  useGetAllQuestionsQuery,
  useFindAndCountQuestionsQuery,
  useAddQuestionMutation,
  useEditQuestionMutation,
  useDeleteQuestionMutation,
} = QuestionsApi;
