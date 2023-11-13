import React,{useEffect, useState} from 'react';
import './candidateProfile.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../../components/profileCard/profileCard';
import Cookies from 'js-cookie';


const CandidateProfile = () => {
    const {id}  = useParams();
    const [candidate, setCandidate] = useState(null)

    useEffect(() => {
        const getCandidate = async() =>{
            try {
                const token = Cookies.get('token')
                const response = await axios.get(`http://localhost:8080/api/candidates/${id}`,{
                    headers:{Authorization: `Bearer ${token}`},
                });
                setCandidate(response.data['candidate'])

            } catch (error) {
                console.error(error);
            }
        }
        getCandidate()
    });
  return (
    <div className="background">
        <div className='container'>
            {candidate ? <ProfileCard candidate={candidate}/>: null}
        </div>
    </div>
  )
}

export default CandidateProfile