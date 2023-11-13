import React, { useState, useEffect } from 'react';
import './home.css'
import axios from 'axios'
import CandidateCard from '../../components/candidateCard/candidateCard';
import Cookies from 'js-cookie';

const Home = () => {
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        const getCandidates = async() =>{
            try {
                const token = Cookies.get('token')
                const response = await axios.get(`http://localhost:8080/api/candidates`,{
                    headers:{Authorization: `Bearer ${token}`}
                });
                setCandidates(response.data['candidates']);
                localStorage.removeItem('token')

            } catch (error) {
                console.error(error);
            }
        }
        getCandidates()
    },[]);
  return (
    <div className='homeContainer'>
      <div className='cardsContainer'>
      {candidates.map(candidate => <CandidateCard candidate={candidate} key={candidate.id}/>)}
    </div>
    </div>
  );
};

export default Home;
