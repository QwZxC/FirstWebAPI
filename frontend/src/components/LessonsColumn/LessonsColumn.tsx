import { Box } from '@mui/material'
import FindLesson from './FindLesson/FindLesson'
import LessonsList from './LessonsList/LessonsList'
import FormAddLesson from './FormAddLesson/FormAddLesson'
import { FC } from 'react'



const LessonsColumn: FC = () => {

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap='10px'
      borderRadius='10px'
      padding='10px'
    >
      <FindLesson />
      
      <LessonsList />

      <FormAddLesson />
    </Box>
  )
}

export default LessonsColumn
