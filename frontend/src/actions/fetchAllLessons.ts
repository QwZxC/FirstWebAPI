import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILesson } from './../models/ILesson';

export const fetchAllLessons = createAsyncThunk<ILesson[], undefined, { rejectValue: string }>(
    "lessons/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<ILesson[]>("https://localhost:5000/api/Lesson/All")
            return response.data
        } catch (err) {
            const error = err as Error
            return rejectWithValue(error.message)
        }
    }
)