import { ChangeEvent, FC, memo } from 'react'
import { TextField } from '@mui/material'
import { useLesson } from '../../../context/lessons'



const FindLesson: FC = () => {
  const { search, setSearch } = useLesson()
  
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

export default memo(FindLesson)