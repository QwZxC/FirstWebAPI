import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ILesson } from './../models/ILesson'

export const addLesson = createAsyncThunk<
  ILesson,
  ILesson,
  { rejectValue: string }
>('lessons/addLesson', async (lesson, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://localhost:5000/api/Lesson/Create',
      lesson,
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
    )

    return response.data
  } catch (err) {
    const error = err as Error
    return rejectWithValue(error.message)
  }
})
