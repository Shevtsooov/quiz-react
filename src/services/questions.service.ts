import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Question } from '../components/types/question';

export const QuestionsApi = createApi({
  reducerPath: 'QuestionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001/'
  }),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Question[], void>({
      query: () => 'questions'
    })
  })
})

export const {
  useGetAllQuestionsQuery
} = QuestionsApi;
