import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonUrl } from '../constants/routes'

export const StartPage = () => {
  const navigate = useNavigate()

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
			flexDirection='column'
			gap="20px"
			marginTop="30px"
    >
      <Typography variant='h3'>Добро пожаловать в WebJournal!</Typography>
      <Button
        variant='contained'
				sx={{fontSize: "25px"}}
        onClick={() => navigate(lessonUrl, { replace: true })}
      >
        Перейти к занятиям
      </Button>
    </Box>
  )
}
