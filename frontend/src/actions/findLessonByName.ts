import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILesson } from './../models/ILesson';

export const findLessonByName = createAsyncThunk<ILesson[], string>(
    "lessons/findLessonByName",
    async (name) => {
        try {
            const response = await axios.get<ILesson[]>(`https://localhost:443/api/Lesson/name:string?name=${name}`)
            return response.data
        } catch (err) {
            return []
        }
    }
)