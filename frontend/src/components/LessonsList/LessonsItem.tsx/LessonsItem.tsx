import { FC } from 'react'
import { ILesson } from '../../../models/ILesson'
import { Button, ListItem, Typography } from '@mui/material';
import { useDeleteLessonMutation } from '../../../store/services/lessonsApi';

interface LessonsItemProps {
  lesson: ILesson
}

export const LessonsItem: FC<LessonsItemProps> = ({ lesson }) => {
  const { id, name, courseId } = lesson

  const [deleteLesson] = useDeleteLessonMutation()

  const buttonClickHandler = async () => {
    if (id === undefined) return
    await deleteLesson(id)
  }

  return (
    <ListItem sx={{gap: "10px"}}>
      <Typography>id: {id}</Typography>
      <Typography>name: {name}</Typography>
      <Typography>courseId: {courseId}</Typography>
			<Button variant="outlined" onClick={buttonClickHandler}>Удалить</Button>
    </ListItem>
  )
}
