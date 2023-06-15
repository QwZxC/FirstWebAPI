import { FC, useState } from 'react'
import { ITheme } from '../../../../models/ITheme'
import {
  Box,
  Button,
  IconButton,
  ListItem,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { Create, Remove } from '@mui/icons-material'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTheme, updateTheme } from '../../../../services/themes'
import { AlertDialog } from '../../../AlertDialog/AlertDialog'
import { ModalWindow } from './../../../ModalWindow/ModalWindow'

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

  const { mutate: updateThemeMutate } = useMutation({
    mutationFn: updateTheme,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons'],
      })
    },
  })



  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalField, setModalField] = useState('')

  const handleDelete = () => {
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

  const handleOpenUpdate = () => {
    setModalOpen(true)
    setModalField(name)
  }

  const handleUpdateTheme = () => {
    console.log(id)
    const themeForUpdate: ITheme = {
      id,
      name: modalField,
      lessonId: 0
    }
    updateThemeMutate(themeForUpdate)
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
      <ModalWindow
        open={modalOpen}
        setOpen={setModalOpen}
        title='Напишите название новой темы:'
        content={
          <Box sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <TextField
              value={modalField}
              onChange={e => setModalField(e.target.value)}
            />
            <Button
              onClick={handleUpdateTheme}
            >Обновить</Button>
          </Box>
        }
      />
      <ListItem sx={commonStyles}>
        <Typography variant='h5' component='p' sx={{ flexGrow: 1 }}>
          {name}
        </Typography>

        <IconButton onClick={handleOpenUpdate}>
          <Create />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Remove color='error' />
        </IconButton>
      </ListItem>
    </>
  )
}
