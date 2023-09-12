import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface CorrectAnswerState {
  value: string | null
}

const initialState: CorrectAnswerState = {
  value: null,
}

export const correctAnswerSlice = createSlice({
  name: 'correctAnswer',
  initialState,
  reducers: {
    setCorrectAnswer: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setCorrectAnswer } = correctAnswerSlice.actions;
export const correctAnswerReducer = correctAnswerSlice.reducer;
