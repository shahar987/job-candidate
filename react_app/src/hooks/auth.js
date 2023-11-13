import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    setIsAuthenticated(!!token);
    if(!!token) console.log("yes")
  }, [isAuthenticated]);

  return isAuthenticated;
};