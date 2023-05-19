import React, { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { fetchAllLessons } from './actions/fetchAllLessons';
import { LessonsList } from './components/LessonsList';
import { FormAddLesson } from './components/FormAddLesson';

const App = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchAllLessons())
  }, [dispatch])

  return (
    <div>
      <LessonsList />
      <FormAddLesson />
    </div>
  )
}

export default App