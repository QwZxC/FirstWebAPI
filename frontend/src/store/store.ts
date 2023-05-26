import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { lessonsApi } from './services/lessonsApi'

const rootReducer = combineReducers({
  [lessonsApi.reducerPath]: lessonsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(lessonsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
