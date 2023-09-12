import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AnswersState {
  value: string[]
}

const initialState: AnswersState = {
  value: ['', ''],
}

export const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setDefaultAnswers: (state) => {
      state.value = ['', ''];
    },
    addNewField: (state) => {
      return {
        ...state,
        value: [...state.value, ''],
      };
    },
    removeField: (state, action) => {
      return {
        ...state,
        value: state.value.filter((_, index) => index !== action.payload),
      };
    },
    setAnswers: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      const updatedAnswers = [...state.value];
      updatedAnswers[index] = value.charAt(0).toUpperCase() + value.slice(1);
      return { ...state, value: updatedAnswers };
    },
    clearInput: (state, action) => {
      const updatedAnswers = [...state.value];
      updatedAnswers[action.payload] = '';
      return { ...state, value: updatedAnswers };
    }
  },
})

export const {
  setDefaultAnswers,
  addNewField,
  removeField,
  setAnswers,
  clearInput,
} = answersSlice.actions;
export const answersReducer = answersSlice.reducer;
