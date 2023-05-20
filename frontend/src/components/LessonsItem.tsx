import { FC } from 'react'
import { ILesson } from '../models/ILesson'

interface LessonsItemProps {
  lesson: ILesson
}

export const LessonsItem: FC<LessonsItemProps> = ({ lesson }) => {
  const { id, name, courseId } = lesson

  return (
    <div>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>courseId: {courseId}</p>
			<button>Удалить</button>
    </div>
  )
}
