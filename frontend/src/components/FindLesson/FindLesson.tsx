import { ChangeEvent, FC } from 'react'
import { TextField } from '@mui/material'

interface FindLessonProps {
  search: string
  setSearch: (search: string) => void
}

export const FindLesson: FC<FindLessonProps> = ({ search, setSearch }) => {
  const searchCnangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <TextField
      sx={{ width: '100%' }}
      type='text'
      value={search}
      label='Поиск занятия...'
      onChange={searchCnangeHandler}
    />
  )
}
