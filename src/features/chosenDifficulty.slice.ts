import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChosenDifficultyState {
  value: string | null
}

const initialState: ChosenDifficultyState = {
  value: null,
}

export const chosenDifficultySlice = createSlice({
  name: 'chosenDifficulty',
  initialState,
  reducers: {
    setChosenDifficulty: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setChosenDifficulty } = chosenDifficultySlice.actions;
export const chosenDifficultyReducer = chosenDifficultySlice.reducer;
