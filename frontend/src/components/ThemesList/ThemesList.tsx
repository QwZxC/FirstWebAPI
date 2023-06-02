import { List } from '@mui/material'
import { FC } from 'react'
import { ITheme } from '../../models/ITheme'
import { ThemesItem } from './ThemesItem/ThemesItem'

interface ThemesListProps {
  themes?: ITheme[]
}

export const ThemesList: FC<ThemesListProps> = ({ themes }) => {
  return (
    <List>
      {themes?.map(theme => (
        <ThemesItem theme={theme} key={theme.id} />
      ))}
    </List>
  )
}
