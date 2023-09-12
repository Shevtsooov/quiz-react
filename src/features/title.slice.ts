import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface TitleState {
  value: string
}

const initialState: TitleState = {
  value: '',
}

export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTitle } = titleSlice.actions;
export const titleReducer = titleSlice.reducer;
