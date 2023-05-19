import { useAppSelector } from './../hooks/redux'
import { LessonsItem } from './LessonsItem'

export const LessonsList = () => {
  const { lessons, error, isLoading } = useAppSelector(state => state.lessons)

  return (
    <div>
      {isLoading ? (
        <p>загрузка</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        lessons.map(lesson => <LessonsItem lesson={lesson} key={lesson.id} />)
      )}
    </div>
  )
}
