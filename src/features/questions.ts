import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Question } from '../components/types/question'

export interface QuestionsState {
  value: Question[]
}

const initialState: QuestionsState = {
  value: [],
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.value = action.payload;
    },
  },
})

export const { setQuestions } = questionsSlice.actions;
export const questionsReducer = questionsSlice.reducer;
