import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import Woman2OutlinedIcon from '@mui/icons-material/Woman2Outlined';
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';

import './profileCard.css';
import { Box } from '@mui/material';

const ProfileCard = ({ candidate }) => {
  return (
    <Box sx={{width: "80%"}}>
      <Box className="title">
        <Avatar 
        src={candidate.avatar} 
        alt="avatar"
        sx={{ width: 200, height: 200, boxShadow:'1px 1px 10px #C2D9FF' }} 
        />
        <Box className="title-info">
          <Typography variant="h6">{`${candidate.first_name} ${candidate.last_name}`}</Typography>
          <Typography variant="subtitle1">{candidate.job_title}</Typography>
        </Box>
      </Box>
      <Typography variant="h5" color={'primary'}>
        Candidate info
      </Typography>
      <Box className="line"></Box>
      <Box className='row'>
        {candidate.gender === 'Female' ? <Woman2OutlinedIcon sx={{marginRight:2}}/> : <ManOutlinedIcon sx={{marginRight:2}}/>}
        <Typography variant="body1">{candidate.gender}</Typography>
      </Box>
      <Box className='row'>
        <EmailIcon sx={{marginRight:2}}/>
        <Typography variant="body1">{candidate.email}</Typography>
      </Box>
      <Typography 
      variant="h6" 
      color={'primary'}
      sx={{marginTop: 2, marginBottom: 2}}>
        Job description</Typography>
      <Typography variant="body1">{candidate.job_description}</Typography>
    </Box>
  );
};

export default ProfileCard;
