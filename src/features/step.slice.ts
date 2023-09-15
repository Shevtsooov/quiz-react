import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface StepState {
  value: number
}

const initialState: StepState = {
  value: 0,
}

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setStep: (state) => {
      state.value += 1
    },
    resetSteps: (state) => {
      state.value = 0
    },
  },
})

export const { setStep, resetSteps } = stepSlice.actions;
export const stepReducer = stepSlice.reducer;
