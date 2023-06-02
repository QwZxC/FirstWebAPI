import { FC } from "react"
import { ITheme } from "../../../models/ITheme"
import { ListItem, Typography } from '@mui/material';

interface ThemesItemProps {
	theme: ITheme
}

export const ThemesItem: FC<ThemesItemProps> = ({ theme }) => {
	const { name } = theme
  return (
    <ListItem>
			<Typography variant="h4" component="p">{name}</Typography>
		</ListItem>
  )
}
