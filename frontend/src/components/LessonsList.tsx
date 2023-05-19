import { useAppSelector } from './../hooks/redux'
import { LessonsItem } from './LessonsItem'

export const LessonsList = () => {
  const { lessons, error, isLoading } = useAppSelector(state => state.lessons)

  const isError = !isLoading && error

  return (
    <div>
      {isLoading && <p>загрузка</p>}

      {isError && <p>{error}</p>}
      {!isError && lessons.length === 0 ? (
        <h1>Занятий нет</h1>
      ) : (
        lessons.map(lesson => <LessonsItem lesson={lesson} key={lesson.id} />)
      )}
    </div>
  )
}
