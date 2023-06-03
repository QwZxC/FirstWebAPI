import { FC, memo, useState } from 'react'
import { Button, FormGroup, TextField } from '@mui/material'
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
        queryKey: ['lessons']
      })
    }
  })

  const submitClickHandler = async () => {
    if (name.length === 0 || lessonId === undefined) return
    const newLesson: ITheme = {
      name,
			lessonId
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
        label='Введите название темы...'
      />
      
      <Button variant='outlined' onClick={submitClickHandler}>
        Добавить
      </Button>
      
    </FormGroup>
  )
}

export default memo(FormAddTheme)