import { FC, useEffect, useRef, useState } from 'react'
import { ILesson } from '../../../models/ILesson'
import {
  IconButton,
  ListItem,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material'
import { useQueryClient, useMutation } from 'react-query'
import { deleteLesson, updateLesson } from './../../../services/lessons'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { useNavigate } from 'react-router-dom'
import { lessonUrl } from '../../../constants/routes'

interface LessonsItemProps {
  lesson: ILesson
  currentLessonId: number | undefined
}

export const LessonsItem: FC<LessonsItemProps> = ({
  lesson,
  currentLessonId,
}) => {
  const { id, name } = lesson

  const [update, setUpdate] = useState(false)
  const [updateValue, setUpdateValue] = useState(name)

  const updateInputRef = useRef<HTMLInputElement>(null)

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

  const closeUpdateClick = () => {
    setUpdate(false)
  }

  useEffect(() => {
    if (update && updateInputRef.current) updateInputRef.current.select()
  }, [update])

  const buttonOpenUpdateClick = () => {
    setUpdate(true)
    setUpdateValue(name)
  }

  const buttonDeleteClick = () => {
    if (id === undefined) return
    deleteLessonById(id)
  }

  const upgradeClick = () => {
    const newLesson = lesson
    newLesson.name = updateValue
    lessonUpdate(newLesson)
    setUpdate(false)
  }

  const navigateByLessonId = () => {
    navigate(lessonUrl + lesson?.id, { replace: true })
  }

  const styles: SxProps<Theme> = {
    cursor: 'pointer',
  }

  return (
    <ListItem
      onClick={navigateByLessonId}
      sx={
        currentLessonId === lesson.id
          ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', ...styles }
          : styles
      }
    >
      {update ? (
        <TextField
          inputRef={updateInputRef}
          label='Изменить название'
          variant='filled'
          sx={{ flexGrow: 1 }}
          value={updateValue}
          onChange={e => setUpdateValue(e.target.value)}
        />
      ) : (
        <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
      )}

      <div>
        {update ? (
          <>
            <IconButton onClick={upgradeClick}>
              <DoneIcon />
            </IconButton>

            <IconButton onClick={closeUpdateClick}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={buttonDeleteClick}>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={buttonOpenUpdateClick}>
              <CreateIcon />
            </IconButton>
          </>
        )}
      </div>
    </ListItem>
  )
}
