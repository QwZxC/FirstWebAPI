import { FC, FormEventHandler, memo, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { createTheme } from '../../../services/themes'
import { ITheme } from '../../../models/ITheme'

interface FormAddThemeProps {
  lessonId: number | undefined
}

const FormAddTheme: FC<FormAddThemeProps> = ({ lessonId }) => {
  const [name, setName] = useState<string>('')
  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: createTheme,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['lessons'],
      })
    },
  })

  const submitClickHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    if (name.length === 0 || lessonId === undefined) return
    const newLesson: ITheme = {
      name,
      lessonId,
    }
    create(newLesson)
    setName('')
  }

  return (
    <form onSubmit={submitClickHandler}>
      <Box display='flex' flexDirection='column' gap='10px'>
        <TextField
          sx={{ width: '100%' }}
          onChange={e => setName(e.target.value)}
          value={name}
          type='text'
          label='Введите название темы...'
        />

        <Button variant='outlined' type='submit'>
          Добавить
        </Button>
      </Box>
    </form>
  )
}

export default memo(FormAddTheme)
