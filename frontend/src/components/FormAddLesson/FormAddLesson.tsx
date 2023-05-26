import { useState } from 'react'
import { Button, FormGroup, TextField } from '@mui/material'
import { useAddLessonMutation } from '../../store/services/lessonsApi'

export const FormAddLesson = () => {

  const [name, setName] = useState<string>('')
  const [addLesson] = useAddLessonMutation()

  const submitClickHandler = async () => {
    if (name.length === 0) return
    await addLesson({ name, themes: [], courseId: 0 })
    setName('')
  }

  return (
    <FormGroup>
      <TextField
        sx={{ width: '100%' }}
        onChange={e => setName(e.target.value)}
        value={name}
        type='text'
        label='Введите название занятия...'
      />
      <Button variant='outlined' onClick={submitClickHandler}>
        Добавить
      </Button>
    </FormGroup>
  )
}
