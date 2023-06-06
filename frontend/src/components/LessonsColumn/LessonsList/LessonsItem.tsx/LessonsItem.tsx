import { FC, useState } from 'react'
import { ILesson } from '../../../../models/ILesson'
import { IconButton, ListItem, SxProps, Theme, Typography } from '@mui/material'
import { useQueryClient, useMutation } from 'react-query'
import { deleteLesson, updateLesson } from '../../../../services/lessons'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import { lessonUrl } from '../../../../constants/routes'
import { LessonUpdateForm } from './LessonUpdateForm/LessonUpdateForm'
import { AlertDialog } from '../../../AlertDialog/AlertDialog'
import { useLessons } from '../../../../context/lessons'

interface LessonsItemProps {
  lesson: ILesson
}

export const LessonsItem: FC<LessonsItemProps> = ({
  lesson,
}) => {
  const { id, name } = lesson
  const { currentLesson } = useLessons();
  const currentLessonId = currentLesson ? currentLesson.id : undefined
  const [isEditing, setIsEditing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const client = useQueryClient()
  const navigate = useNavigate()

  const { mutate: lessonUpdate } = useMutation({
    mutationFn: updateLesson,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons', 'all', 'search'],
      })
    },
  })

  const { mutate: deleteLessonById } = useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons', 'all', 'search'],
      })
    },
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleDeleteClick = () => {
    if (id === undefined) return
    setDeleteDialogOpen(true)
  }
  
  const handleFormSubmit = (value: string) => {
    const newLesson = lesson
    newLesson.name = value
    lessonUpdate(newLesson)
    setIsEditing(false)
  }

  const handleFormCancel = () => {
    setIsEditing(false)
  }

  const handleClick = () => {
    navigate(lessonUrl + lesson?.id, { replace: true })
  }

  const commonStyles: SxProps<Theme> = {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  }

  const lessonItemStyles: SxProps<Theme> =
    currentLessonId === lesson.id
      ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', ...commonStyles }
      : commonStyles

  const handleDeleteAgree = () => {
    if (!id) return
    deleteLessonById(id)
    setDeleteDialogOpen(false)
  }

  const handleDeleteDisagree = () => {
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <AlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        title="Вы действительно хотите удалить?"
        description={`Вы удаляете занятие "${name}". Это действие нельзя отменить!`}
        agreeButtonText="Удалить"
        disagreeButtonText="Отмена"
        handleAgree={handleDeleteAgree}
        handleDisagree={handleDeleteDisagree}
      />

      <ListItem onClick={handleClick} sx={lessonItemStyles}>
        {isEditing ? (
          <LessonUpdateForm
            initialValue={name}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <Typography sx={{ flexGrow: 1 }}>{name}</Typography>

            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={handleEditClick}>
              <CreateIcon />
            </IconButton>
          </>
        )}
      </ListItem>
    </>
  )
}
