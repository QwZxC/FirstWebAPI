import { FormAddLesson } from '../components/FormAddLesson/FormAddLesson'
import { LessonsList } from '../components/LessonsList/LessonsList'
import { FindLesson } from '../components/FindLesson/FindLesson'
import { Container } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLessonsAndFindByString } from '../services/lessons'
import { useQuery } from 'react-query'
import { ThemesList } from '../components/ThemesList/ThemesList'

export const LessonsPage = () => {
  const [search, setSearch] = useState('')
  const { id } = useParams()  
  
  const currentLessonId: number | undefined = id === undefined? undefined : +id

  const { isLoading, isError, data: lessons, refetch, isSuccess } = useQuery({
    queryFn: () => getLessonsAndFindByString(search === '' ? 'All' : search),
    queryKey: ['lessons', 'all', 'search'],
    onError: (error) => console.error(error)
  })

  const currentLesson = lessons?.find(lesson => lesson.id === currentLessonId)
  console.log(currentLesson)

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
          <Grid item xs={4}>
            <Typography variant='h3' component='p'>
              Lessons
            </Typography>
            <FindLesson search={search} setSearch={setSearch} />
            <LessonsList 
              search={search} 
              isError={isError} 
              isLoading={isLoading}
              isSuccess={isSuccess}
              lessons={lessons}
              currentLessonId={currentLessonId}
            />
            <FormAddLesson />
          </Grid>

          <Grid item xs={8}>
            <Typography variant='h3'>Темы</Typography>
            <ThemesList themes={currentLesson?.themes}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
