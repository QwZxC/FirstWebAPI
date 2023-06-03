import { Typography } from '@mui/material'
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
      <Typography variant='h3'>Темы</Typography>
      <ThemesList themes={themes} />
      <FormAddTheme lessonId={lessonId} />
    </>
  )
}

export default ThemesColumn
