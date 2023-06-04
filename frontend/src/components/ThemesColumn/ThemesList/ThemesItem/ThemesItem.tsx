import { FC, useState } from 'react'
import { ITheme } from '../../../../models/ITheme'
import { IconButton, ListItem, SxProps, Theme, Typography } from '@mui/material'
import { Remove } from '@mui/icons-material'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTheme } from '../../../../services/themes'
import { AlertDialog } from '../../../AlertDialog/AlertDialog'

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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const deleteHandler = () => {
    if (!id) return
    setDeleteDialogOpen(true)
  }

  const handleDeleteAgree = () => {
    if (!id) return
    deleteThemeById(id)
    setDeleteDialogOpen(false)
  }

  const handleDeleteDisagree = () => {
    setDeleteDialogOpen(false)
  }

  const commonStyles: SxProps<Theme> = {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }

  return (
    <>
      <AlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title='Вы действительно хотите удалить?'
        description={`Вы удаляете тему "${name}". Это действие нельзя отменить!`}
        agreeButtonText='Удалить'
        disagreeButtonText='Отмена'
        handleAgree={handleDeleteAgree}
        handleDisagree={handleDeleteDisagree}
      />

      <ListItem sx={commonStyles}>
        <Typography variant='h5' component='p' sx={{ flexGrow: 1 }}>
          {name}
        </Typography>

        <IconButton onClick={deleteHandler}>
          <Remove color='error' />
        </IconButton>
      </ListItem>
    </>
  )
}
