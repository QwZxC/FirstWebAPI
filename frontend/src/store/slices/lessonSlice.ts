import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllLessons } from "../../actions/fetchAllLessons";
import { findLessonByName } from "../../actions/findLessonByName";
import { ILesson } from "../../models/ILesson";
import { addLesson } from './../../actions/addLesson';
import { deleteLessonByID } from './../../actions/deleteLessonByID';

interface LessonState {
    isLoading: boolean,
    error: null | string,
    lessons: ILesson[]
}

const initialState: LessonState = {
    isLoading: false,
    error: null,
    lessons: [],
}

const lessonSlice = createSlice({
    initialState,
    name: "lesson",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLessons.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchAllLessons.fulfilled, (state, action) => {
                state.isLoading = false
                state.lessons = action.payload
            })

            .addCase(addLesson.fulfilled, (state, action) => {
                state.isLoading = false
                state.lessons.push(action.payload)
            })
            .addCase(addLesson.pending, (state) => {
                state.error = null
            })

            .addCase(deleteLessonByID.fulfilled, (state, action) => {
                state.lessons.filter(lesson => lesson.id !== action.payload.id)
            })

            .addCase(findLessonByName.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(findLessonByName.fulfilled, (state, action) => {
                state.isLoading = false
                state.lessons = action.payload
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

function isError(action: AnyAction  ) {
    return action.type.endsWith('rejected')
}

export default lessonSlice.reducer