import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <Card sx={{ minWidth: 275, padding:'10px 0' }}>
      <CardContent sx={{ textAlign: 'center', alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column' }}>
        <Avatar 
        src={candidate.avatar} alt="avatar"
        sx={{width:'100px', height:'100px', boxShadow: '1px 1px 10px #C2D9FF'}} />
        <div>
          <Typography variant="h6" >
            {`${candidate.first_name} ${candidate.last_name}`}
          </Typography>
          <Typography variant="subtitle1" >
            {candidate.job_title}
          </Typography>
        </div>
        <Button onClick={handleClick} variant="outlined">
          Full Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
