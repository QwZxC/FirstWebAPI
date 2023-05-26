import { FormAddLesson } from '../components/FormAddLesson/FormAddLesson'
import { LessonsList } from '../components/LessonsList/LessonsList'
import { FindLesson } from '../components/FindLesson/FindLesson'
import { Container } from '@mui/system'
import { useState } from 'react'

export const LessonsPage = () => {
  const [search, setSearch] = useState('');
  
  return (
    <div>
      <Container>
        <FindLesson search={search} setSearch={setSearch} />
        <LessonsList search={search} />
        <FormAddLesson />
      </Container>
    </div>
  )
}
