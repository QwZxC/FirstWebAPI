import { useState } from 'react'
import { Button, FormGroup, TextField } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { createLesson } from '../../services/lessons'

export const FormAddLesson = () => {
  const [name, setName] = useState<string>('')

  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons', 'all', 'search']
      })
    }
  })

  const submitClickHandler = async () => {
    if (name.length === 0) return
    const newLesson = {
      courseId: 0,
      name,
      themes: [],
    }
    create(newLesson)
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
