import { List, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { ITheme } from '../../models/ITheme'
import { ThemesItem } from './ThemesItem/ThemesItem'

interface ThemesListProps {
  themes?: ITheme[]
}

const ThemesList: FC<ThemesListProps> = ({ themes }) => {
	console.log(themes)
  return (
    <List>
      {(themes?.length === 0 || !themes) && (
        <Typography variant='h4' component='p'>
          Тем не найдено
        </Typography>
      )}
      {themes?.map(theme => (
        <ThemesItem theme={theme} key={theme.id} />
      ))}
    </List>
  )
}

export default memo(ThemesList)
