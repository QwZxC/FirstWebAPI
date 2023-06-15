import { Box, Modal, Typography } from '@mui/material'
import React, { FC, ReactElement } from 'react'

interface ModalWindowProps {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  content?: ReactElement[] | ReactElement,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export const ModalWindow: FC<ModalWindowProps> = ({
  open,
  setOpen,
  title = '',
	content,
}) => {
  const handleClose = () => setOpen(false)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          {title}
        </Typography>
        {content}
      </Box>
    </Modal>
  )
}
