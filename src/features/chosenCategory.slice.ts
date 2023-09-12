import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChosenCategoryState {
  value: string | null
}

const initialState: ChosenCategoryState = {
  value: null,
}

export const chosenCategorySlice = createSlice({
  name: 'chosenCategory',
  initialState,
  reducers: {
    setChosenCategory: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setChosenCategory } = chosenCategorySlice.actions;
export const chosenCategoryReducer = chosenCategorySlice.reducer;
