import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface PasswordState {
  value: string
}

const initialState: PasswordState = {
  value: '',
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setPassword } = passwordSlice.actions;
export const passwordReducer = passwordSlice.reducer;
