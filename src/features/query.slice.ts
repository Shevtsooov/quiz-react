import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface QueryState {
  value: string
}

const initialState: QueryState = {
  value: '',
}

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setQuery } = querySlice.actions;
export const queryReducer = querySlice.reducer;
