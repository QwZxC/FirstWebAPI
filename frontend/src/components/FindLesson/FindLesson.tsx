import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { useDebounce } from '../../hooks/useDebounce'
import { findLessonByName } from '../../actions/findLessonByName'
import { fetchAllLessons } from '../../actions/fetchAllLessons'

export const FindLesson = () => {
  const [search, setSearch] = useState('')

  const dispatch = useAppDispatch()

  const searchByString = (string: string) => {
    if (string.length === 0) dispatch(fetchAllLessons())
    else dispatch(findLessonByName(string))
  }
  
  const debounceSearchByString = useDebounce(searchByString, 250)
  
  const searchCnangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debounceSearchByString(value.trim())
  }

  return (
    <input
      type='text'
      value={search}
      placeholder='Поиск занятия...'
      onChange={searchCnangeHandler}
    />
  )
}
