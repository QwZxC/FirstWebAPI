import { List, Typography } from '@mui/material'
import { Loader } from '../../Loader/Loader'
import { LessonsItem } from './LessonsItem.tsx/LessonsItem'
import { FC, memo } from 'react'

import { ILesson } from '../../../models/ILesson'

interface LessonsListProps {
  search: string
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  currentLessonId: number | undefined
  lessons?: ILesson[]
}

const LessonsList: FC<LessonsListProps> = ({
  search,
  isLoading,
  isSuccess,
  lessons,
  isError,
  currentLessonId
}) => {
  const lessonsIsEmpty = isSuccess && lessons?.length === 0

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <Typography>Ошибка!</Typography>}
      {lessonsIsEmpty && <Typography variant='h5'>Занятий нет</Typography>}

      {!lessonsIsEmpty && (
        <List>
          {lessons?.map(lesson => (
            <LessonsItem lesson={lesson} key={lesson.id} currentLessonId={currentLessonId} />
          ))}
        </List>
      )}
    </div>
  )
}

export default memo(LessonsList)