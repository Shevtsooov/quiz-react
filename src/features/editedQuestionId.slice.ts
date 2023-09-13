import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface EditedQuestionIdState {
  value: number | null
}

const initialState: EditedQuestionIdState = {
  value: null,
}

export const editedQuestionIdSlice = createSlice({
  name: 'editedQuestionId',
  initialState,
  reducers: {
    setEditedQuestionId: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setEditedQuestionId } = editedQuestionIdSlice.actions;
export const editedQuestionIdReducer = editedQuestionIdSlice.reducer;
