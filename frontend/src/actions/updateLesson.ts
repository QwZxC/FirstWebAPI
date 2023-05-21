import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ILesson } from './../models/ILesson'

export const updateLesson = createAsyncThunk<
  ILesson,
  ILesson,
  { rejectValue: string }
>('lessons/updateLesson', async (lesson, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://localhost/api/Lesson/Update',
      lesson,
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
    )
    return response.data
  } catch (err) {
    const error = err as Error
    return rejectWithValue(error.message)
  }
})
