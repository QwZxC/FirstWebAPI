import { FC } from "react"
import { ITheme } from "../../../models/ITheme"
import { ListItem } from '@mui/material';

interface ThemesItemProps {
	theme: ITheme
}

export const ThemesItem: FC<ThemesItemProps> = ({ theme }) => {
  return (
    <ListItem>
			{theme.name}
		</ListItem>
  )
}
