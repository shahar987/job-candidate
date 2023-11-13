import React from 'react';
import './candidateCard.css';
import {useNavigate } from "react-router-dom";

const CandidateCard = ({candidate}) => {
  const navigate = useNavigate();
  
  const handleClick = () =>{
    navigate(`/candidates/${candidate.id}`);
  }
  return (
    <div className='card'>
        <img className='avatar' src={candidate.avatar} alt='avatar'/>
        <div className="description">
          <p className='fullName'>{candidate.first_name} {candidate.last_name}</p>
          <p className='job'>{candidate.job_title}</p>
        </div>
          <button onClick={handleClick}>full dedails</button>
    </div>
  );
};

export default CandidateCard;
