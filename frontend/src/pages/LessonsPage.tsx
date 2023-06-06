import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import LessonsColumn from '../components/LessonsColumn/LessonsColumn'
import ThemesColumn from '../components/ThemesColumn/ThemesColumn'
import { LessonProvider } from '../context/lessons'

export const LessonsPage = () => {
  return (
    <div>
      <LessonProvider>
        <Container>
          <Grid container spacing={2}>
            {/* Left column */}
            <Grid item xs={4}>
              <LessonsColumn />
            </Grid>
            {/* Left column */}

            {/* Right column */}
            <Grid item xs={8}>
              <ThemesColumn />
            </Grid>
            {/* Right column */}
          </Grid>
        </Container>
      </LessonProvider>
    </div>
  )
}
