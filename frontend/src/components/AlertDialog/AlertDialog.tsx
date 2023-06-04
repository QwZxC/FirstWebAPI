import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC } from 'react'

interface AlertProps {
  handleAgree: () => void
  handleDisagree: () => void
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  description?: string
  agreeButtonText?: string
  disagreeButtonText?: string
}

export const AlertDialog: FC<AlertProps> = props => {
  const {
    open,
    handleAgree,
    handleDisagree,
    setOpen,
    agreeButtonText = 'Да',
    disagreeButtonText = 'Нет',
    title = 'Предупреждение',
    description = 'Вы уверены?',
  } = props

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>{disagreeButtonText}</Button>
        <Button onClick={handleAgree} autoFocus>
          {agreeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
