import { configureStore } from '@reduxjs/toolkit'
import { pageReducer } from '../features/page.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { clickedAnswerIndexReducer } from '../features/clickedAnswerIndex.slice'
import { isCorrectReducer } from '../features/isCorrect.slice'
import { isInCorrectReducer } from '../features/isInCorrect.slice'
import { stepReducer } from '../features/step.slice'
import { QuestionsApi } from '../services/questions.service'
import { titleReducer } from '../features/title.slice'
import { answersReducer } from '../features/answers.slice'
import { correctAnswerReducer } from '../features/correctAnswer.slice'
import { chosenCategoryReducer } from '../features/chosenCategory.slice'
import { chosenDifficultyReducer } from '../features/chosenDifficulty.slice'

export const store = configureStore({
  reducer: {
    step: stepReducer,
    page: pageReducer,
    isCorrect: isCorrectReducer,
    isInCorrect: isInCorrectReducer,
    clickedAnswerIndex: clickedAnswerIndexReducer,
    [QuestionsApi.reducerPath]: QuestionsApi.reducer,
    title: titleReducer,
    answers: answersReducer,
    correctAnswer: correctAnswerReducer,
    chosenCategory: chosenCategoryReducer,
    chosenDifficulty: chosenDifficultyReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(QuestionsApi.middleware)
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
