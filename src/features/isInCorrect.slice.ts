import { createSlice } from '@reduxjs/toolkit';

export interface IsInCorrectState {
  value: boolean;
}

const initialState: IsInCorrectState = {
  value: false,
}

export const isInCorrectSlice = createSlice({
  name: 'isInCorrect',
  initialState,
  reducers: {
    setInCorrect: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setInCorrect } = isInCorrectSlice.actions;
export const isInCorrectReducer = isInCorrectSlice.reducer;
