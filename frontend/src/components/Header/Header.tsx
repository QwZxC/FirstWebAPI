import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <NavLink to='/lessons'>
          <Typography variant='h5' color="White">Занятия</Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  )
}
