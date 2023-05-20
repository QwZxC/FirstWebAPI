import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILesson } from './../models/ILesson';

export const deleteLessonByID = createAsyncThunk<ILesson, number, { rejectValue: string }>(
    "lessons/deleteLessonById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete<ILesson>(`https://localhost:443/api/Lesson/${id}`)
            return response.data
        } catch (err) {
            const error = err as Error
            return rejectWithValue(error.message)
        }
    }
)