import { FormAddLesson } from '../components/FormAddLesson/FormAddLesson'
import { LessonsList } from '../components/LessonsList/LessonsList'
import { FindLesson } from '../components/FindLesson/FindLesson'
import { Container } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { useState } from 'react'

export const LessonsPage = () => {
  const [search, setSearch] = useState('')

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant='h3' component='p'>
              Lessons
            </Typography>
            <FindLesson search={search} setSearch={setSearch} />
            <LessonsList search={search} />
            <FormAddLesson />
          </Grid>

          <Grid item xs={8}>
            
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
