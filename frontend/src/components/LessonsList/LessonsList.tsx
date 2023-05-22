import { List, Typography } from '@mui/material'
import { useAppSelector } from '../../hooks/redux'
import { LessonsItem } from './LessonsItem.tsx/LessonsItem'

export const LessonsList = () => {
  const { lessons, error, isLoading } = useAppSelector(state => state.lessons)

  const isError = !isLoading && error
  const lessonsIsEmpty = !isLoading && !isError && lessons.length === 0

  return (
    <div>
      {isLoading && <Typography>загрузка</Typography>}
      {isError && <Typography>{error}</Typography>}

      {lessonsIsEmpty ? (
        <Typography variant='h3'>Занятий нет</Typography>
      ) : (
        <List>
          {lessons.map(lesson => (
            <LessonsItem lesson={lesson} key={lesson.id} />
          ))}
        </List>
      )}
    </div>
  )
}
