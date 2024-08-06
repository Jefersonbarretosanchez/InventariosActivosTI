import React, { createContext, useState, useEffect } from 'react';
import api from './api';

export const AuthContext = createContext();

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const refreshTokenIfNeeded = async () => {
    try {
      await api.post("/api/token/refresh/");
    } catch (error) {
      // console.error('Error refreshing token', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshTokenIfNeeded();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    user,
    setUser,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
