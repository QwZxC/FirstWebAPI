import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { fetchAllLessons } from './actions/fetchAllLessons';

const App = () => {
  const { error, isLoading, lessons } = useAppSelector(state => state.lessons)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllLessons())
  }, [dispatch])

  return (
    <div>
      { isLoading && <p>Загрузка</p>}
      { error && <div>{error}</div>}
      { !isLoading && !error && <p>{JSON.stringify(lessons)}</p>}
    </div>
  )
}

export default App