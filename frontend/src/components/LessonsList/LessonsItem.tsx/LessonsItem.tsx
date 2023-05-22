import { FC } from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { ILesson } from '../../../models/ILesson'
import { deleteLessonByID } from '../../../actions/deleteLessonByID';

interface LessonsItemProps {
  lesson: ILesson
}

export const LessonsItem: FC<LessonsItemProps> = ({ lesson }) => {
  const { id, name, courseId } = lesson

  const dispatch = useAppDispatch();

  return (
    <div>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>courseId: {courseId}</p>
			<button onClick={() => id && dispatch(deleteLessonByID(id))}>Удалить</button>
    </div>
  )
}
