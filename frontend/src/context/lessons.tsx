import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ILesson } from '../models/ILesson'
import { getLessonsAndFindByString } from '../services/lessons'

interface ContextProps {
  search: string
  setSearch: (search: string) => void
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  lessons?: ILesson[]
  currentLesson?: ILesson
}

export const LessonContext = createContext<ContextProps>({
  search: '',
  setSearch: () => {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  currentLesson: undefined
})

export const useLesson = () => {
  return useContext(LessonContext)
}

export const LessonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('')
  const { id } = useParams()

  const currentLessonId: number | undefined = id === undefined ? undefined : +id

  const {
    isLoading,
    isError,
    data: lessons,
    refetch,
    isSuccess,
  } = useQuery({
    queryFn: () => getLessonsAndFindByString(search === '' ? 'All' : search),
    queryKey: ['lessons', 'all', 'search'],
    onError: error => console.error(error),
  })

  const currentLesson = lessons?.find(lesson => lesson.id === currentLessonId)

  //debounce search with delay 300 ms
  useEffect(() => {
    let timer = setTimeout(() => {
      refetch()
    }, 300)

    return () => clearTimeout(timer)
  }, [search, refetch])

  return (
    <LessonContext.Provider
      value={{
        isError,
        isLoading,
        isSuccess,
        search,
        currentLesson,
        lessons,
        setSearch,
      }}
    >
      {children}
    </LessonContext.Provider>
  )
}
