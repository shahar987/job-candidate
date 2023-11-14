import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button onClick={() => navigate('/')}>
          <HomeIcon sx={{ mr: 2, color: 'white' }} />
        </Button>
        <Typography variant="h6" color="inherit" noWrap>
          TalentHub
        </Typography>
        <Button onClick={handleLogout}>
          <LogoutOutlinedIcon sx={{ ml: 2, color: 'white' }} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
