import { Box, Typography } from '@mui/material'
import ThemesList from './ThemesList/ThemesList'
import FormAddTheme from './FormAddTheme/FormAddTheme'
import { ITheme } from '../../models/ITheme'
import { FC } from 'react'

interface ThemesColumnProps {
  themes?: ITheme[]
  lessonId?: number
}

const ThemesColumn: FC<ThemesColumnProps> = ({ themes, lessonId }) => {
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
