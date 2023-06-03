import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonUrl, startPage } from '../../constants/routes'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Box display='flex' gap='10px' alignItems='center' width='100%'>
          <Typography
            variant='h4'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate(startPage, { replace: true })}
          >
            WebJournal
          </Typography>

          <Typography
            variant='h5'
            sx={{ color: 'white', cursor: 'pointer' }}
            onClick={() => {
              navigate(lessonUrl, { replace: true })
            }}
          >
            Занятия
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
