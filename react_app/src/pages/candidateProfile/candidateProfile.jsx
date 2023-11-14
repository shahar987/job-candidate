import React,{useEffect, useState} from 'react';
import './candidateProfile.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ProfileCard from '../../components/profileCard/profileCard';
import Navbar from '../../components/navbar';
import Loading from '../../components/loading';
import useAuth from '../../hooks/auth';


const CandidateProfile = () => {
    const {id}  = useParams();
    const [candidate, setCandidate] = useState(null)
    const {logout} = useAuth();

    useEffect(() => {
        const getCandidate = async() =>{
            try {
                const response = await axios.get(`http://localhost:8080/api/candidates/${id}`,{
                    withCredentials: true
                });
                setCandidate(response.data['candidate'])

            } catch (error) {
                console.error(error);
                if(error.response.status === 401) logout()
                
            }
        }
        getCandidate()
    },[]);
  return (
    <div >
        <Navbar/>
        <div className='container'>
            {candidate ? <ProfileCard candidate={candidate}/>: <Loading/>}
        </div>
    </div>
  )
}

export default CandidateProfile