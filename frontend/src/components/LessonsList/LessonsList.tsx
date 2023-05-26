import { List, Typography } from '@mui/material'
import { Loader } from '../Loader/Loader'
import { LessonsItem } from './LessonsItem.tsx/LessonsItem'
import {
  useGetAllLessonsQuery,
  useGetLessonByStringQuery,
} from '../../store/services/lessonsApi'
import { FC, useEffect, useRef, useState } from 'react'

interface LessonsListProps {
  search: string
}

export const LessonsList: FC<LessonsListProps> = ({ search }) => {
  const { data: lessons, isLoading, isError } = useGetAllLessonsQuery()
  const [searchValue, setSearchValue] = useState('')
  const timer = useRef<NodeJS.Timeout>()
  const { data: searchLessons, error } = useGetLessonByStringQuery(searchValue)

  useEffect(() => {
    timer.current = setTimeout(() => {
      setSearchValue(search)
    }, 200)
    return () => clearTimeout(timer.current)
  }, [search])

  const lessonsIsEmpty = !isLoading && !isError && lessons?.length === 0

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <Typography>Ошибка!</Typography>}
      {lessonsIsEmpty && <Typography variant='h5'>Занятий нет</Typography>}

      {!lessonsIsEmpty && (
        <List>
          {searchValue.length === 0
            ? lessons?.map(lesson => (
                <LessonsItem lesson={lesson} key={lesson.id} />
              ))
            : searchLessons?.map(lesson => (
                <LessonsItem lesson={lesson} key={lesson.id} />
              ))}
        </List>
      )}
    </div>
  )
}
