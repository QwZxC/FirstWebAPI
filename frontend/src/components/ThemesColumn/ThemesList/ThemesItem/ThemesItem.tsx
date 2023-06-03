import { FC } from 'react'
import { ITheme } from '../../../../models/ITheme'
import { IconButton, ListItem, SxProps, Theme, Typography } from '@mui/material'
import { Remove } from '@mui/icons-material'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTheme } from '../../../../services/themes'

interface ThemesItemProps {
  theme: ITheme
}

export const ThemesItem: FC<ThemesItemProps> = ({ theme }) => {
  const { name, id } = theme

  const client = useQueryClient()

  const { mutate: deleteThemeById } = useMutation({
    mutationFn: deleteTheme,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons'],
      })
    },
  })

  const deleteHandler = () => {
    if (id === undefined) return
    deleteThemeById(id)
  }

	const commonStyles: SxProps<Theme> = {
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  }

  return (
    <ListItem
      sx={commonStyles}
    >
      <Typography variant='h5' component='p' sx={{ flexGrow: 1 }}>
        {name}
      </Typography>

      <IconButton onClick={deleteHandler}>
        <Remove color='error' />
      </IconButton>
    </ListItem>
  )
}
