import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = useCallback((token) => {
    Cookies.set('token', token);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, login, logout };
};

export default useAuth;
