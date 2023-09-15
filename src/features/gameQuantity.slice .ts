import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameQuantityState {
  value: number
}

const initialState: GameQuantityState = {
  value: 0,
}

export const gameQuantitySlice = createSlice({
  name: 'gameQuantity',
  initialState,
  reducers: {
    setGameQuantity: (state, action) => {
        state.value = action.payload
    },
    resetGameQuantity: (state) => {
      state.value = 0
    },
  },
})

export const {
  setGameQuantity,
  resetGameQuantity,
} = gameQuantitySlice.actions;
export const gameQuantityReducer = gameQuantitySlice.reducer;
