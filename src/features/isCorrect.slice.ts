import { createSlice } from '@reduxjs/toolkit';

export interface IsCorrectState {
  value: boolean;
}

const initialState: IsCorrectState = {
  value: false,
}

export const isCorrectSlice = createSlice({
  name: 'isCorrect',
  initialState,
  reducers: {
    setIsCorrect: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { setIsCorrect } = isCorrectSlice.actions;
export const isCorrectReducer = isCorrectSlice.reducer;
