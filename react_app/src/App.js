import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CandidateProfile from './pages/candidateProfile/candidateProfile';
import Home from './pages/home/home';
import SignIn from './pages/signin/signIn';
import SignUp from './pages/signup/signup';
import useAuth from './hooks/auth';

const  App =() => {
  const {isLoggedIn} = useAuth();

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={isLoggedIn ?<Home/> : <Navigate to='/signin'/>}/>
          <Route path="/candidates/:id" element={isLoggedIn ? <CandidateProfile/> : <Navigate to='/signin'/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;


