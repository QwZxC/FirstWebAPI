import { useAppSelector } from '../../hooks/redux'
import { LessonsItem } from './LessonsItem.tsx/LessonsItem'

export const LessonsList = () => {
  const { lessons, error, isLoading } = useAppSelector(state => state.lessons)

  const isError = !isLoading && error
  const lessonsIsEmpty = !isLoading && !isError && lessons.length === 0

  return (
    <div>
      {isLoading && <p>загрузка</p>}
      {isError && <p>{error}</p>}

      {lessonsIsEmpty ? (
        <h1>Занятий нет</h1>
      ) : (
        lessons.map(lesson => <LessonsItem lesson={lesson} key={lesson.id} />)
      )}
    </div>
  )
}
