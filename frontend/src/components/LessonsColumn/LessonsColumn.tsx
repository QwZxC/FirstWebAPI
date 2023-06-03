import { Box, Typography } from '@mui/material'
import FindLesson from './FindLesson/FindLesson'
import LessonsList from './LessonsList/LessonsList'
import FormAddLesson from './FormAddLesson/FormAddLesson'
import { ILesson } from '../../models/ILesson'
import { FC } from 'react'

interface LessonsColumnProps {
  search: string
  setSearch: (search: string) => void
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  lessons?: ILesson[]
  currentLessonId?: number
}

const LessonsColumn: FC<LessonsColumnProps> = ({
  search,
  setSearch,
  isLoading,
  isError,
  isSuccess,
  lessons,
  currentLessonId,
}) => {
  return (
    <Box 
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Typography variant='h3' component='p'>
        Занятия
      </Typography>
      <FindLesson search={search} setSearch={setSearch} />
      <LessonsList
        search={search}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        lessons={lessons}
        currentLessonId={currentLessonId}
      />
      <FormAddLesson />
    </Box>
  )
}

export default LessonsColumn;
