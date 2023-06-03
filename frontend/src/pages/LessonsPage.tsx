import { useQuery } from 'react-query'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLessonsAndFindByString } from '../services/lessons'
import LessonsColumn from '../components/LessonsColumn/LessonsColumn'
import ThemesColumn from '../components/ThemesColumn/ThemesColumn'

export const LessonsPage = () => {
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

  const lessonsData = {
    search,
    isError,
    isLoading,
    isSuccess,
    lessons,
    currentLessonId,
  }

  const currentLesson = lessons?.find(lesson => lesson.id === currentLessonId)

  //debounce search with delay 300 ms
  useEffect(() => {
    let timer = setTimeout(() => {
      refetch()
    }, 300)

    return () => clearTimeout(timer)
  }, [search, refetch])

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={4}>
            <LessonsColumn {...lessonsData} setSearch={setSearch} />
          </Grid>
          {/* Left column */}

          {/* Right column */}
          <Grid item xs={8}>
            <ThemesColumn themes={currentLesson?.themes} lessonId={currentLessonId} />
          </Grid>
          {/* Right column */}
        </Grid>
      </Container>
    </div>
  )
}
