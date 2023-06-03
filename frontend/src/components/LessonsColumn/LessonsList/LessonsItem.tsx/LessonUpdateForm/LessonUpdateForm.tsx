import { Close, Done } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"

interface LessonUpdateFormProps {
  initialValue: string
  onSubmit: (value: string) => void
  onCancel: () => void
}

export const LessonUpdateForm: FC<LessonUpdateFormProps> = ({
  initialValue,
  onSubmit,
  onCancel,
}) => {
  const updateInputRef = useRef<HTMLInputElement>(null)
  const [updateValue, setUpdateValue] = useState(initialValue)

  useEffect(() => {
    if (updateInputRef.current) updateInputRef.current.select()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(updateValue)
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Box display='flex' width='100%' alignItems='center'>
        <TextField
          inputRef={updateInputRef}
          label='Изменить название'
          variant='filled'
          sx={{ flexGrow: 1 }}
          value={updateValue}
          onChange={e => setUpdateValue(e.target.value)}
        />

        <div>
          <IconButton type='submit'>
            <Done />
          </IconButton>

          <IconButton onClick={onCancel} type='reset'>
            <Close />
          </IconButton>
        </div>
      </Box>
    </form>
  )
}
