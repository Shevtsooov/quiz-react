import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface FilteredCategoryState {
  value: string
}

const initialState: FilteredCategoryState = {
  value: 'Всі категорії',
}

export const filteredCategorySlice = createSlice({
  name: 'filteredCategory',
  initialState,
  reducers: {
    setFilteredCategory: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setFilteredCategory } = filteredCategorySlice.actions;
export const filteredCategoryReducer = filteredCategorySlice.reducer;
