import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lessonSlice from "./slices/lessonSlice";

const rootReducer = combineReducers({
    lessons: lessonSlice
})

export const store = configureStore({
    reducer: rootReducer
})

export type  RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
