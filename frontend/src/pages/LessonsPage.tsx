import { useEffect } from "react"
import { fetchAllLessons } from "../actions/fetchAllLessons"
import { FormAddLesson } from "../components/FormAddLesson"
import { LessonsList } from "../components/LessonsList"
import { useAppDispatch } from "../hooks/redux"
import { FindLesson } from './../components/FindLesson';

export const LessonsPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllLessons())
  }, [dispatch])

  return (
    <div>
      <FindLesson />
      <LessonsList />
      <FormAddLesson />
    </div>
  )
}
