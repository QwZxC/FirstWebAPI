import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILesson } from './../../models/ILesson'
import { url } from './../../constants/url'

export const lessonsApi = createApi({
  reducerPath: 'lessonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/Lesson` }),
  tagTypes: ['Lesson'],
  endpoints: builder => ({
    getAllLessons: builder.query<ILesson[], void>({
      query: () => '/All',
      providesTags: result => ['Lesson'],
    }),

    addLesson: builder.mutation<ILesson, ILesson>({
      query: lesson => ({
        url: '/Create',
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: ['Lesson'],
    }),

    deleteLesson: builder.mutation<ILesson[], number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),

    getLessonByString: builder.query<ILesson[], string>({
      query: name => ({
        url: `/name:string`,
        method: 'GET',
        params: {
          name,
        },
      }),
      providesTags: result => ['Lesson'],
    }),
  }),
})

export const {
  useGetAllLessonsQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByStringQuery
} = lessonsApi
