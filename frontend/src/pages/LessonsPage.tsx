import { useEffect } from 'react'
import { fetchAllLessons } from '../actions/fetchAllLessons'
import { FormAddLesson } from '../components/FormAddLesson/FormAddLesson'
import { LessonsList } from '../components/LessonsList/LessonsList'
import { useAppDispatch } from '../hooks/redux'
import { FindLesson } from '../components/FindLesson/FindLesson'
import { Container } from '@mui/system'

export const LessonsPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllLessons())
  }, [dispatch])

  return (
    <div>
      <Container>
        <FindLesson />
        <LessonsList />
        <FormAddLesson />
      </Container>
    </div>
  )
}
