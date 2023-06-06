import { Box, Typography } from '@mui/material'
import ThemesList from './ThemesList/ThemesList'
import FormAddTheme from './FormAddTheme/FormAddTheme'
import { FC } from 'react'
import { useLesson } from '../../context/lessons'


const ThemesColumn: FC = () => {
  const { currentLesson } = useLesson()
  const lessonId = currentLesson ? currentLesson.id : undefined
  const themes = currentLesson?.themes
  return (
    <>
      {lessonId ? (
        <>
          <ThemesList themes={themes} />
          <FormAddTheme lessonId={lessonId} />
        </>
      ) : (
        <Box display='flex' justifyContent='center'>
          <Typography variant='h4' component='p'>
            Выберите занятие
          </Typography>
        </Box>
      )}
    </>
  )
}

export default ThemesColumn
