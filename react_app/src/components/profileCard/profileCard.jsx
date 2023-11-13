import React from 'react';
import './profileCard.css';

const ProfileCard = ({candidate}) => {
    
  return (
    <div className='profileCard'>
        <div className="title">
            <img className='avatar' src={candidate.avatar} alt='avatar'/>
            <div className="title-info">
                <p>{candidate.first_name} {candidate.last_name}</p>
                <p>{candidate.job_title}</p>
            </div>
        </div>
        <p className='section-title'>Candidate info</p>
        <div className="line"></div>
        <p>{candidate.gender}</p>
        <p>{candidate.email}</p>
        <p>{candidate.job_description}</p>
    </div>
  );
};

export default ProfileCard;
