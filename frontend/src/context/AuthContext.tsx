import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { isTokenValid, getTokenData, removeToken } from '../utils/auth';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && isTokenValid(storedToken)) {
      const userData = getTokenData(storedToken) as any;
      setToken(storedToken);
      setUser({
        id: userData.id,
        username: userData.username,
        role: userData.role
      });
    } else {
      removeToken();
    }
  }, []);

  const login = (newToken: string) => {
    const userData = getTokenData(newToken) as any;
    setToken(newToken);
    setUser({
      id: userData.id,
      username: userData.username,
      role: userData.role
    });
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
