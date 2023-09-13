import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface FilteredDifficultyState {
  value: string
}

const initialState: FilteredDifficultyState = {
  value: 'Складність',
}

export const filteredDifficultySlice = createSlice({
  name: 'filteredDifficulty',
  initialState,
  reducers: {
    setFilteredDifficulty: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setFilteredDifficulty } = filteredDifficultySlice.actions;
export const filteredDifficultyReducer = filteredDifficultySlice.reducer;
