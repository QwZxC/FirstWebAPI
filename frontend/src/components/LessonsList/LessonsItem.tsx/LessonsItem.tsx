import { FC } from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { ILesson } from '../../../models/ILesson'
import { deleteLessonByID } from '../../../actions/deleteLessonByID';
import { Button, ListItem, Typography } from '@mui/material';

interface LessonsItemProps {
  lesson: ILesson
}

export const LessonsItem: FC<LessonsItemProps> = ({ lesson }) => {
  const { id, name, courseId } = lesson

  const dispatch = useAppDispatch();

  return (
    <ListItem sx={{gap: "10px"}}>
      <Typography>id: {id}</Typography>
      <Typography>name: {name}</Typography>
      <Typography>courseId: {courseId}</Typography>
			<Button variant="outlined" onClick={() => id && dispatch(deleteLessonByID(id))}>Удалить</Button>
    </ListItem>
  )
}
