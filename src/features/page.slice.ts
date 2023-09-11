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
    increment: (state) => {
      state.value += 1
    },
    clear: (state) => {
      state = {
        ...initialState
      }
    },
  },
})

export const { increment, clear } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;
