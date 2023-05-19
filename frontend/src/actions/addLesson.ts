import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ILesson } from './../models/ILesson'

export const addLesson = createAsyncThunk<
  ILesson,
  ILesson,
  { rejectValue: string }
>('lessons/addLesson', async (lesson, { rejectWithValue }) => {
  const newLesson = {
    name: lesson.name,
    themes: [],
    courseId: 1,
  } as ILesson

  try {
    const response = await axios.post(
      'https://localhost/api/Lesson/Create',
      newLesson,
      { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
    )

    return response.data
		
  } catch (err) {
    const error = err as Error
    return rejectWithValue(error.message)
  }
})
