import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { addLesson } from '../../actions/addLesson'
import { Button, FormGroup, TextField } from '@mui/material'

export const FormAddLesson = () => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')

  const submitClickHandler = () => {
    if (name.length === 0) return
    dispatch(addLesson({ name, themes: [], courseId: 0 }))
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
