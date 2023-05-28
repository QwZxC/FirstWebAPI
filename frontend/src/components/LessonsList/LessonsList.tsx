import { List, Typography } from '@mui/material'
import { Loader } from '../Loader/Loader'
import { LessonsItem } from './LessonsItem.tsx/LessonsItem'
import { FC, useEffect } from 'react'

import { useQuery } from 'react-query'
import { getLessonsAndFindByString } from './../../services/lessons'

interface LessonsListProps {
  search: string
}

export const LessonsList: FC<LessonsListProps> = ({ search }) => {
  const { isLoading, isError, data: lessons, refetch, isSuccess } = useQuery({
    queryFn: () => getLessonsAndFindByString(search === '' ? 'All' : search),
    queryKey: ['lessons', 'all', 'search'],
    onError: (error) => console.error(error)
  })

  //debounce search with delay 300 ms
  useEffect(() => {
    let timer = setTimeout(() => {
      refetch()
    }, 300)

    return () => clearTimeout(timer)
  }, [search, refetch])

  const lessonsIsEmpty = isSuccess && lessons?.length === 0

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <Typography>Ошибка!</Typography>}
      {lessonsIsEmpty && <Typography variant='h5'>Занятий нет</Typography>}

      {!lessonsIsEmpty && (
        <List>
          {lessons?.map(lesson => (
            <LessonsItem lesson={lesson} key={lesson.id} />
          ))}
        </List>
      )}
    </div>
  )
}
