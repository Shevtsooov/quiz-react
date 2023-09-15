import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface PageState {
  value: number
}

const initialState: PageState = {
  value: 0,
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state) => {
      state.value += 1
    },
    resetPage: (state) => {
      state.value = 0
    },
  },
})

export const { setPage, resetPage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
