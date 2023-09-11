import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface clickedAnswerIndexState {
  value: number | null
}

const initialState: clickedAnswerIndexState = {
  value: null,
}

export const clickedAnswerIndexSlice = createSlice({
  name: 'clickedAnswerIndex',
  initialState,
  reducers: {
    setClickedAnswerIndex: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setClickedAnswerIndex } = clickedAnswerIndexSlice.actions;
export const clickedAnswerIndexReducer = clickedAnswerIndexSlice.reducer;
