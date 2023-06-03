import { useQuery } from 'react-query'
import ThemesList from '../components/ThemesList/ThemesList'
import FormAddLesson from '../components/FormAddLesson/FormAddLesson'
import LessonsList from '../components/LessonsList/LessonsList'
import FindLesson from '../components/FindLesson/FindLesson'
import { Container } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLessonsAndFindByString } from '../services/lessons'
import FormAddTheme from '../components/FormAddTheme/FormAddTheme'

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
            <Typography variant='h3' component='p'>
              Занятия
            </Typography>
            <FindLesson search={search} setSearch={setSearch} />
            <LessonsList {...lessonsData} />
            <FormAddLesson />
          </Grid>
          {/* Left column */}

          {/* Right column */}
          <Grid item xs={8}>
            <Typography variant='h3'>Темы</Typography>
            <ThemesList themes={currentLesson?.themes} />
            <FormAddTheme lessonId={currentLessonId} />
          </Grid>
          {/* Right column */}
        </Grid>
      </Container>
    </div>
  )
}
