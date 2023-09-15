import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameCorrectAnswersState {
  value: number
}

const initialState: GameCorrectAnswersState = {
  value: 0,
}

export const gameCorrectAnswersSlice = createSlice({
  name: 'gameCorrectAnswers',
  initialState,
  reducers: {
    setGameCorrectAnswers: (state) => {
        state.value += 1
    },
    resetGameCorrectAnswers: (state) => {
      state.value = 0
    },
  },
})

export const {
  setGameCorrectAnswers,
  resetGameCorrectAnswers,
} = gameCorrectAnswersSlice.actions;
export const gameCorrectAnswersReducer = gameCorrectAnswersSlice.reducer;
