import React from 'react';
import './candidateCard.css';
import {useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const CandidateCard = ({candidate}) => {
  const navigate = useNavigate();
  
  const handleClick = () =>{
    navigate(`/candidates/${candidate.id}`);
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ textAlign: 'center' }}>
      <img className='avatar' src={candidate.avatar} alt='avatar'/>
        <div className="description">
          <p className='fullName'>{candidate.first_name} {candidate.last_name}</p>
          <p className='job'>{candidate.job_title}</p>
        </div>
        <Button 
          onClick={handleClick} 
          variant="outlined"
          >
          full dedails
        </Button>
      </CardContent>  
    </Card>

  );
};

export default CandidateCard;
