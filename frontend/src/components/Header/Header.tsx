import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonUrl } from '../../constants/routes'

export const Header = () => {
  const navigate = useNavigate()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button
          sx={{color: "white"}}
          onClick={() => {
            navigate(lessonUrl, { replace: true })
          }}
        >
          Занятия
        </Button>
      </Toolbar>
    </AppBar>
  )
}
