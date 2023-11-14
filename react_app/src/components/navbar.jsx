import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import React from 'react';

export const Navbar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link to="/">
          <IconButton >
            <HomeIcon sx={{ mr: 2 }} />
          </IconButton>
        </Link>
        <Typography variant="h6" color="inherit" noWrap>
          TalentHub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
