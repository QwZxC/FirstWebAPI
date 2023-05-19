import React, { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { fetchAllLessons } from './actions/fetchAllLessons';
import { LessonsList } from './components/LessonsList';

const App = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(fetchAllLessons())
  }, [dispatch])

  return (
    <div>
      <LessonsList />
    </div>
  )
}

export default App