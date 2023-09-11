import { configureStore } from '@reduxjs/toolkit'
import { pageReducer } from '../features/page.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { clickedAnswerIndexReducer } from '../features/clickedAnswerIndex.slice'
import { isCorrectReducer } from '../features/isCorrect.slice'
import { isInCorrectReducer } from '../features/isInCorrect.slice'
import { stepReducer } from '../features/step.slice'
import { QuestionsApi } from '../services/questions.service'

export const store = configureStore({
  reducer: {
    step: stepReducer,
    page: pageReducer,
    isCorrect: isCorrectReducer,
    isInCorrect: isInCorrectReducer,
    clickedAnswerIndex: clickedAnswerIndexReducer,
    [QuestionsApi.reducerPath]: QuestionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(QuestionsApi.middleware)
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
