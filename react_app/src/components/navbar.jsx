import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import {useNavigate } from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate();
  return (
    <AppBar position="relative">
      <Toolbar>
        <Button onClick={()=>navigate('/')}>
            <HomeIcon sx={{ mr: 2, color: 'white' }} />
        </Button>
        <Typography variant="h6" color="inherit" noWrap>
          TalentHub
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
