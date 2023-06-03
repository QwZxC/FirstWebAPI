import { FormEventHandler, memo, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { createLesson } from '../../../services/lessons'

const FormAddLesson = () => {
  const [name, setName] = useState<string>('')
  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons', 'all', 'search'],
      })
    },
  })

  const submitClickHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (name.length === 0) return
    const newLesson = {
      courseId: 100,
      name,
      themes: [],
    }
    create(newLesson)
    setName('')
  }

  return (
    <form onSubmit={submitClickHandler}>
      <Box 
        display='flex' 
        flexDirection='column' 
        gap='10px'
        
      >
        <TextField
          sx={{ width: '100%' }}
          onChange={e => setName(e.target.value)}
          value={name}
          type='text'
          label='Введите название занятия...'
        />

        <Button variant='outlined' type='submit'>
          Добавить
        </Button>
      </Box>
    </form>
  )
}
export default memo(FormAddLesson)
