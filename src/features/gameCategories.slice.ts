import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameCategoriesState {
  value: string[]
}

const initialState: GameCategoriesState = {
  value: [],
}

export const gameCategoriesSlice = createSlice({
  name: 'gameCategories',
  initialState,
  reducers: {
    setGameCategories: (state, action) => {
      return {
        ...state,
        value: [...state.value, action.payload],
      };
    },
    filterGameCategories: (state, action) => {
      return {
        ...state,
        value: state.value.filter((cat) => cat !== action.payload),
      };
    },
    resetGameCategoriess: (state) => {
      state.value = []
    },
  },
})

export const {
  setGameCategories,
  filterGameCategories,
  resetGameCategoriess,
} = gameCategoriesSlice.actions;
export const gameCategoriesReducer = gameCategoriesSlice.reducer;
